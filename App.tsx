import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, RegisterScreen, WelcomeScreen } from './screens'
import { AuthContextProvider, useAuth } from './AuthContextProvider'

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type RootStackParamList = {
  Welcome: undefined
  Login: undefined
  Register: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

const Navigation = () => {
  const { isFirstTime } = useAuth()

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isFirstTime
          ? (
          <RootStack.Screen name="Welcome" component={WelcomeScreen} />
            )
          : (
          <RootStack.Group>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegisterScreen} />
          </RootStack.Group>
            )}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default function App () {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  )
}
