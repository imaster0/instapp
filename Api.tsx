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

export const signUp = async (user: SignUpWithPasswordCredentials) => {
  const response = await client.auth.signUp(user)

  if (response.error !== null) {
    console.error(response.error)
  }

  return response.data
}

export const signIn = async (user: SignInWithPasswordCredentials) => {
  const response = await client.auth.signInWithPassword(user)

  if (response.error !== null) {
    console.error(response.error)
  }

  return response.data
}

export const uploadFile = async (arrayBuffer: ArrayBuffer) =>
  await client.storage
    .from('images')
    .upload(Date.now().toString(), arrayBuffer)

export const getPublicUrl = async (path: string) => {
  const response = await client.storage.from('images').getPublicUrl(path)
  return response.data.publicUrl
}

export const addPost = async (description: string, url: string) =>
  await client
    .from('posts')
    .insert({
      description,
      image_url: url
    })
    .limit(1)
    .single()

export const getPosts = async () => {
  const response = await client
    .from('posts')
    .select('*')
    .is('archived_at', null)
  return response.data
}

export const archivePost = async (id: number) =>
  await client
    .from('posts')
    .update({
      archived_at: new Date().toISOString()
    })
    .eq('id', id)
