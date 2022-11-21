import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

export async function getItem<Type> (key: string): Promise<Type | null> {
  try {
    const storeData = await AsyncStorage.getItem(key)
    return JSON.parse(storeData!) as Type
  } catch (error) {
    console.error(error)
  }
  return null
}

export const storeItem = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (error) {
    console.error(error)
  }
}

export async function getSecuredItem<Type> (key: string): Promise<Type | null> {
  try {
    const storeData = await SecureStore.getItemAsync(key)
    return JSON.parse(storeData!) as Type
  } catch (error) {
    console.error(error)
  }
  return null
}

export const storeSecuredItem = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await SecureStore.setItemAsync(key, jsonValue)
  } catch (error) {
    console.error(error)
  }
}
