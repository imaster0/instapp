import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, RegisterScreen, WelcomeScreen } from './screens'
import { AuthContextProvider, useAuth } from './AuthContextProvider'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashboardScreen from './screens/dashboard/DashboardScreen'
import PostScreen from './screens/dashboard/PostScreen'
import ProfileScreen from './screens/dashboard/ProfileScreen'

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type RootStackParamList = {
  Welcome: undefined
  Login: undefined
  Register: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()
const MainTabNavigator = createBottomTabNavigator()
const DashboardStack = createNativeStackNavigator()

const DashboardNavigation = () => (
  <DashboardStack.Navigator screenOptions={{ title: '' }}>
    <DashboardStack.Screen name="dashboard" component={DashboardScreen} />
    <DashboardStack.Screen name="post" component={PostScreen} />
    <DashboardStack.Screen name="profile" component={ProfileScreen} />
  </DashboardStack.Navigator>
)

const SignedInNavigation = () => (
  <MainTabNavigator.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <MainTabNavigator.Screen name="Dashboard" component={DashboardNavigation} />
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
