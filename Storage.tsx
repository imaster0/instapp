import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getItem<Type> (key: string): Promise<Type | null> {
  try {
    const storeData = await AsyncStorage.getItem(key)
    return JSON.parse(storeData as string) as Type
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
