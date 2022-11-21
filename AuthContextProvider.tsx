import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { getItem, storeItem } from './Storage'

interface Props {
  children: ReactNode
}

export interface AuthContextProp {
  login: () => void
  startJourney: () => void
  isFirstTime: boolean
  isSignedIn: boolean
}

export const AuthContext = createContext<AuthContextProp>({
  login () {},
  startJourney () {},
  isFirstTime: true,
  isSignedIn: false
})

export const AuthContextProvider = ({ children }: Props) => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(true)

  const login = () => setIsSignedIn(true)
  const startJourney = async () => {
    setIsFirstTime(false)
    await storeItem('@isFirstTime', false)
  }

  useEffect(() => {
    const loadData = async () => {
      const isFirstTime = await getItem<boolean>('@isFirstTime')
      if (isFirstTime !== null) {
        setIsFirstTime(isFirstTime)
      }
    }
    loadData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isFirstTime, isSignedIn, login, startJourney }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
