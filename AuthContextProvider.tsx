/* eslint-disable @typescript-eslint/no-floating-promises */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { ActivityIndicator, View } from 'react-native'
import { getAuth } from './Api'
import { getItem, storeItem } from './Storage'

interface Props {
  children: ReactNode
}

export interface AuthContextProp {
  startJourney: () => Promise<void>
  isFirstTime: boolean
  isSignedIn: boolean
  userId: string
}

export const AuthContext = createContext<AuthContextProp>({
  startJourney: async () => {},
  isFirstTime: true,
  isSignedIn: false,
  userId: ''
})

export const AuthContextProvider = ({ children }: Props) => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')

  const startJourney = async () => {
    setIsFirstTime(false)
    await storeItem('@isFirstTime', false)
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const isFirstTime = await getItem<boolean>('@isFirstTime')
        const user = await getAuth()

        if (isFirstTime !== null) {
          setIsFirstTime(isFirstTime)
        }
        if (user !== null) {
          setUserId(user.data.user!.id)
          setIsSignedIn(true)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  return loading
    ? (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
      )
    : (
    <AuthContext.Provider
      value={{ isFirstTime, isSignedIn, startJourney, setLoading, userId }}
    >
      {children}
    </AuthContext.Provider>
      )
}

export const useAuth = () => useContext(AuthContext)
