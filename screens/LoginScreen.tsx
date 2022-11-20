import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Text, View } from 'react-native'
import { RootStackParamList } from 'App'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

const LoginScreen = ({ navigation }: Props) => (
  <View>
    <Text>Login</Text>
    <Button title="Login" onPress={() => {}} />
    <Button title="Sign up" onPress={() => navigation.navigate('Register')} />
  </View>
)

export default LoginScreen
