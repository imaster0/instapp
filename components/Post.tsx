import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'

const Post = ({
  id,
  url,
  author = { first_name: 'John', last_name: 'Doe' },
  likes = [],
  comments = []
}) => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>
        {author.first_name} {author.last_name}
      </Text>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() =>
          navigation.navigate('post', { id, title: `Post #${id}` })
        }
      >
        <Image
          style={{
            width: 400,
            height: 300
          }}
          source={{
            uri: url
          }}
        />
      </TouchableHighlight>
      <Text>{likes.length} Likes</Text>
    </View>
  )
}

export default Post
