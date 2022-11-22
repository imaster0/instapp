import React from 'react'
import { Image, TouchableHighlight } from 'react-native'

const Avatar = ({ onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <Image
      style={{ width: 50, height: 50 }}
      source={{
        uri: 'https://w7.pngwing.com/pngs/96/344/png-transparent-user-profile-instagram-computer-icons-insta-head-silhouette-blog.png'
      }}
    />
  </TouchableHighlight>
)

export default Avatar
