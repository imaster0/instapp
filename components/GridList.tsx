import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, Image, TouchableHighlight } from 'react-native'
import theme from '../Theme'

const GridList = ({ posts, ...props }) => {
  const navigation = useNavigation()
  return (
    <FlatList
      contentContainerStyle={{
        flexGrow: 1
      }}
      numColumns={3}
      data={posts}
      renderItem={({ item }) => (
        <TouchableHighlight
          onPress={() =>
            navigation.navigate('Dashboard', {
              screen: 'post',
              params: {
                title: `Post #${item.id}`,
                id: item.id
              }
            })
          }
        >
          <Image
            source={{
              uri: item.image_url
            }}
            style={{ width: 100, height: 100, margin: theme.spacings.base / 2 }}
          />
        </TouchableHighlight>
      )}
      {...props}
    />
  )
}

export default GridList
