import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Avatar from '../../components/Avatar'
import Post from '../../components/Post'

const DashboardScreen = () => {
  const navigation = useNavigation()

  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Avatar onPress={() => navigation.navigate('profile')} />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </View>
      <Text>Dashboard</Text>
      <Post
        onImagePress={() => navigation.navigate('post')}
        comments={['HEllo']}
      />
      <Post onImagePress={() => alert('Pressed!')} comments={['Lol']} />
      <Post
        onImagePress={() => alert('Pressed!')}
        comments={['This is awesome']}
      />
    </ScrollView>
  )
}

export default DashboardScreen
