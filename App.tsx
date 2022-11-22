import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, RegisterScreen, WelcomeScreen } from './screens'
import { AuthContextProvider, useAuth } from './AuthContextProvider'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type RootStackParamList = {
  Welcome: undefined
  Login: undefined
  Register: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()
const MainTabNavigator = createBottomTabNavigator()

const SignedInNavigation = () => (
  <MainTabNavigator.Navigator>
    <MainTabNavigator.Screen
      name="Signed in"
      component={() => <Text>Signed in</Text>}
    />
  </MainTabNavigator.Navigator>
)

const Navigation = () => {
  const { isFirstTime, isSignedIn } = useAuth()

  if (isSignedIn) {
    return <SignedInNavigation />
  }

  return (
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
  )
}

export default function App () {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthContextProvider>
  )
}
