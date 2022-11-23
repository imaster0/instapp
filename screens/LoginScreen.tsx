import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, StyleSheet } from 'react-native'
import TextInput from '../components/TextInput'
import { RootStackParamList } from '../App'
import { Controller, useForm } from 'react-hook-form'
import { signIn } from '../Api'
import { useAuth } from '../AuthContextProvider'
import theme from '../Theme'
import Space from '../components/Space'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>
interface LoginInputs {
  email: string
  password: string
}

const LoginScreen = ({ navigation }: Props) => {
  const { register, handleSubmit, control } = useForm<LoginInputs>()
  const { login } = useAuth()
  const onSubmit = async (data: LoginInputs) => {
    const response = await signIn({
      email: data.email,
      password: data.password
    })
    await login(response)
  }

  return (
    <Space style={styles.screen}>
      <Controller
        {...register('email', { required: true })}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        {...register('password', { required: true })}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
      <Button title="Sign up" onPress={() => navigation.navigate('Register')} />
    </Space>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: theme.margins.screen
  }
})

export default LoginScreen
