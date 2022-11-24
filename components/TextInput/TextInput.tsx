import React from 'react'
import { TextInput as NativeTextInput, TextInputProps } from 'react-native'
import styles from './styles'

const TextInput = ({ style, ...props }: TextInputProps) => (
  <NativeTextInput style={[style, styles.default]} {...props} />
)

export default TextInput
