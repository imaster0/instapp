import React from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'

const Post = ({
  name = 'Name',
  url = 'https://i1.kwejk.pl/k/obrazki/2011/11/f1d8ba58b5924ff801e227530d9692a3.jpg',
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
          width: '100%',
          height: 250
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
