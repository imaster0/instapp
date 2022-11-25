import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { URL, KEY } from '@env'

import {
  createClient,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials
} from '@supabase/supabase-js'

export const client = createClient(URL, KEY, {
  auth: {
    detectSessionInUrl: false,
    storage: AsyncStorage,
    autoRefreshToken: true
  }
})

export const refreshSession = async () => {
  console.log('API: REFRESH SESSION')
  return await client.auth.refreshSession()
}

export const updateUser = async (id: number) => {
  console.log('update user', id)
  const response = await client
    .from('users')
    .update({
      first_name: 'Jakub',
      last_name: 'S',
      image_url:
        'https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png'
    })
    .eq('uuid', id)
}

export const getAuth = async () => await client.auth.getUser()

export const signUp = async (user: SignUpWithPasswordCredentials) => {
  console.log('API: SIGN UP')
  const response = await client.auth.signUp(user)

  if (response.error !== null) {
    console.error(response.error)
    throw response.error
  }

  return response.data
}

export const signIn = async (user: SignInWithPasswordCredentials) => {
  console.log('API: SIGN IN', user)
  const response = await client.auth.signInWithPassword(user)

  if (response.error !== null) {
    console.error(response.error)
    throw response.error
  }

  return response.data
}

export const signOut = async () => {
  const response = await client.auth.signOut()
  if (response.error !== null) {
    throw response.error
  }
}

export const uploadFile = async (arrayBuffer: ArrayBuffer) => {
  console.log('API: UPLOAD FILE')
  const response = await client.storage
    .from('images')
    .upload(Date.now().toString(), arrayBuffer)

  if (response.error != null) {
    console.error(response.error)
    throw response.error
  }
  return response.data
}

export const getPublicUrl = async (path: string) => {
  console.log('API: GET PUBLIC URL', path)
  const response = await client.storage.from('images').getPublicUrl(path)
  return response.data.publicUrl
}

export const addPost = async (description: string, url: string) => {
  console.log('API: ADD POST', description, url)
  return await client
    .from('posts')
    .insert({
      description,
      image_url: url
    })
    .limit(1)
    .single()
}

export const getPosts = async () => {
  console.log('API: GET POSTS')
  const response = await client
    .from('posts')
    .select('*, author:users (first_name, last_name), comments (text:body)')
    .is('archived_at', null)

  return response.data
}

export const getPostsByDescription = async (search: string) => {
  console.log('API: GET POSTS BY DESCRIPTION')
  const response = await client
    .from('posts')
    .select('*, author:users (first_name, last_name), comments (text:body)')
    .is('archived_at', null)
    .ilike('description', `%${search}%`)
    .limit(20)
  // console.log(response)
  return response.data
}

export const getPostDetails = async (id) => {
  console.log('API: POST DETAILS', id)
  const response = await client
    .from('posts')
    .select(
      'id, created_at, description, image_url, comments ( text:body, creator_uuid, id )'
    )
    .eq('id', id)
    .is('archived_at', null)
    .single()

  return response.data
}

export const archivePost = async (id: number) => {
  console.log('API: ARCHIVE POST', id)
  return await client
    .from('posts')
    .update({
      archived_at: new Date().toISOString()
    })
    .eq('id', id)
}

export const getUser = async (id: any) => {
  console.log('API: GET USER', id)
  const response = await client
    .from('users')
    .select('*, posts (id, image_url, archived_at)')
    .is('posts.archived_at', null)
    .eq('uuid', id)
    .single()
  // console.log(response.data)
  return response.data
}

export const getUsers = async (limit: number) => {
  console.log('API: GET USERS')
  const response = await client
    .from('users')
    .select('uuid, image_url')
    .not('image_url', '')
    .limit(limit)
  console.log(response)
  return response.data
}

export const getUsersByName = async (search: string) => {
  console.log('API: GET USERS')
  const response = await client
    .from('users')
    .select('*')
    .or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%`)
    .limit(20)
  console.log(response.data)
  return response.data
}

interface CommentProps {
  text: string
  postId: number
}

export const addComment = async ({ text, postId }: CommentProps) => {
  console.log('API: ADD COMMENT', text, postId)
  const author = await getAuth()
  const response = await client
    .from('comments')
    .insert({
      body: text,
      post_id: postId,
      creator_uuid: author.data.user?.id
    })
    .limit(1)
    .single()
  return response.data
}
