import React from 'react'
import { Text } from 'react-native'
import styles from './styles'

const Header = ({ children, style }) => (
  <Text style={[styles.default, style]}>{children}</Text>
)

export default Header
