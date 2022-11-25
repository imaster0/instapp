import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import theme from '../Theme'

interface Props {
  children: ReactNode[]
  direction?: 'column' | 'row'
  style?: object
}

const Space = ({ children, direction = 'column', style, ...props }: Props) => (
  <View style={[style, { flex: 1, flexDirection: direction }]} {...props}>
    {children.map((child: ReactNode, index: any) => (
      <View
        key={index}
        style={direction === 'column' ? styles.column : styles.row}
      >
        {child}
      </View>
    ))}
  </View>
)

const styles = StyleSheet.create({
  column: {
    marginVertical: theme.spacings.base / 2
  },
  row: {
    marginHorizontal: theme.spacings.base / 2
  }
})

export default Space
