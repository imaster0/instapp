import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, View } from 'react-native'
import { getPosts } from '../../Api'
import Avatar from '../../components/Avatar'
import Post from '../../components/Post'
import Space from '../../components/Space'
import { useQuery } from '@tanstack/react-query'

const DashboardScreen = () => {
  const navigation = useNavigation()
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    onSuccess (data) {
      console.log(data)
    }
  })

  return (
    <Space>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Avatar onPress={() => navigation.navigate('profile')} />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </View>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        renderItem={({ item }) => (
          <Post
            id={item.id}
            url={item.image_url}
            onImagePress={() => navigation.navigate('post')}
          />
        )}
      />
    </Space>
  )
}

export default DashboardScreen
