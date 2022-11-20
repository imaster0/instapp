import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from 'App'
import React from 'react'
import { Button, Text, View } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>

const WelcomeScreen = ({ route }: Props) => (
  <View>
    <Text>Welcome Screen</Text>
    <Button title="Start journey" onPress={route.params.onStart} />
  </View>
)

export default WelcomeScreen
