import React from 'react'
import { useAuth } from '../AuthContextProvider'
import { Button, Text, View } from 'react-native'

const WelcomeScreen = () => {
  const { startJourney } = useAuth()
  return (
    <View>
      <Text>Welcome Screen</Text>
      <Button title="Start journey" onPress={startJourney} />
    </View>
  )
}

export default WelcomeScreen
