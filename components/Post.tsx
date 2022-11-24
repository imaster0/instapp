import React from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'

const Post = ({
  id,
  url,
  name = 'Name',
  likes = [],
  comments = [],
  onImagePress
}) => (
  <View>
    <Text>{name}</Text>
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={onImagePress}
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
    <Text>{comments[0]}</Text>
  </View>
)

export default Post
