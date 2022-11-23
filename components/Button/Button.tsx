import React from 'react'
import { Button as NativeButton } from 'react-native'

const Button = ({ children, ...props }) => (
  <NativeButton {...props}>{children}</NativeButton>
)
