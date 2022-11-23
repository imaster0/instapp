import React from 'react'
import { View } from 'react-native'
import theme from '../Theme'

const Space = ({ children, ...props }) => (
  <View {...props}>
    {children.map((child) => (
      <View style={{ marginVertical: theme.spacings.base / 2 }}>{child}</View>
    ))}
  </View>
)

export default Space
