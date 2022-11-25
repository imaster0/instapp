import React from 'react'
import { FlatList, Image } from 'react-native'
import theme from '../Theme'

const GridList = ({ posts, ...props }) => {
  return (
    <FlatList
      contentContainerStyle={{
        flexGrow: 1
      }}
      numColumns={3}
      data={posts}
      renderItem={(item) => (
        <Image
          source={{
            uri: 'https://i1.kwejk.pl/k/obrazki/2011/11/f1d8ba58b5924ff801e227530d9692a3.jpg'
          }}
          style={{ width: 100, height: 100, margin: theme.spacings.base / 2 }}
        />
      )}
      {...props}
    />
  )
}

export default GridList
