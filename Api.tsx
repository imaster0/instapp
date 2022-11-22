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
    storage: AsyncStorage
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
