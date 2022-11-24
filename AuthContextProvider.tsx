/* eslint-disable @typescript-eslint/no-floating-promises */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { ActivityIndicator } from 'react-native'
import { client } from './Api'
import { getItem, storeItem } from './Storage'

interface Props {
  children: ReactNode
}

export interface AuthContextProp {
  login: (response: any) => Promise<void>
  startJourney: () => Promise<void>
  isFirstTime: boolean
  isSignedIn: boolean
}

export const AuthContext = createContext<AuthContextProp>({
  login: async (response: any) => {},
  startJourney: async () => {},
  isFirstTime: true,
  isSignedIn: false
})

export const AuthContextProvider = ({ children }: Props) => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [loading, setLoading] = useState<boolean>(false)

  const login = async (response: any) => {
    console.log(response)
  }

  const startJourney = async () => {
    setIsFirstTime(false)
    await storeItem('@isFirstTime', false)
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const isFirstTime = await getItem<boolean>('@isFirstTime')
      const user = await client.auth.getUser()
      if (isFirstTime !== null) {
        setIsFirstTime(isFirstTime)
      }
      if (user !== null) {
        setIsSignedIn(true)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  return loading
    ? (
    <ActivityIndicator size="small" color="#0000ff" />
      )
    : (
    <AuthContext.Provider
      value={{ isFirstTime, isSignedIn, login, startJourney }}
    >
      {children}
    </AuthContext.Provider>
      )
}

export const useAuth = () => useContext(AuthContext)
