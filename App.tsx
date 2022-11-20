import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, RegisterScreen, WelcomeScreen } from './screens'

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type RootStackParamList = {
  Welcome: { onStart: () => void }
  Login: undefined
  Register: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function App () {
  const [isFirstTime, setIsFirstTime] = useState(true)

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isFirstTime
          ? (
          <RootStack.Screen
            name="Welcome"
            component={WelcomeScreen}
            initialParams={{ onStart: () => setIsFirstTime(false) }}
          />
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
