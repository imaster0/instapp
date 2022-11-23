import React from 'react'
import { TextInput as NativeTextInput } from 'react-native'
import styles from './styles'

const TextInput = (props) => (
  <NativeTextInput style={styles.default} {...props} />
)

export default TextInput
