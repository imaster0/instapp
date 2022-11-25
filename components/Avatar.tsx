import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, TouchableHighlight } from 'react-native'

const Avatar = ({ userId }) => {
  const navigation = useNavigation()

  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('profile', { id: userId })}
    >
      <Image
        style={{ width: 50, height: 50 }}
        source={{
          uri: 'https://w7.pngwing.com/pngs/96/344/png-transparent-user-profile-instagram-computer-icons-insta-head-silhouette-blog.png'
        }}
      />
    </TouchableHighlight>
  )
}

export default Avatar
