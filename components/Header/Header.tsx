import React, { ReactNode } from 'react'
import { Text } from 'react-native'
import styles from './styles'

interface Props {
  children: ReactNode
  style?: object
}

const Header = ({ children, style }: Props) => (
  <Text style={[styles.default, style]}>{children}</Text>
)

export default Header
