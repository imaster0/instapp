/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useRef } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, StyleSheet, Text, View } from 'react-native'
import { signUp } from '../Api'
import Space from '../components/Space'
import TextInput from '../components/TextInput'
import theme from '../Theme'

interface RegisterInputs {
  email: string
  password: string
  passwordConfirmation: string
}

const RegisterScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<RegisterInputs>()
  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit: SubmitHandler<RegisterInputs> = async (
    data: RegisterInputs
  ) => await signUp({ email: data.email, password: data.password })

  return (
    <Space style={styles.screen}>
      <View>
        <Controller
          control={control}
          {...register('email', { required: true })}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email != null && <Text>This field is required</Text>}
      </View>
      <Controller
        control={control}
        {...register('password', { required: true })}
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
      <View>
        <Controller
          control={control}
          name="passwordConfirmation"
          rules={{
            validate: (value) => password.current === value || 'Differ'
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password confirmation"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.passwordConfirmation != null && (
          <Text>{errors.passwordConfirmation.message}</Text>
        )}
      </View>
      <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
    </Space>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: theme.margins.screen
  }
})

export default RegisterScreen
