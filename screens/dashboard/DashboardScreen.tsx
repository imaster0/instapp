import React, { useEffect } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { getPosts } from '../../Api'
import Avatar from '../../components/Avatar'
import Post from '../../components/Post'
import Space from '../../components/Space'
import { useQuery } from '@tanstack/react-query'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const DashboardScreen = () => {
  const tabBarHeight = useBottomTabBarHeight()
  const { data, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  return (
    <Space>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </View>
      {isError
        ? (
        <Text>Something went wrong...</Text>
          )
        : (
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: tabBarHeight + 40
          }}
          data={data}
          ListEmptyComponent={() => <Text>No posts</Text>}
          renderItem={({ item }) => (
            <Post
              id={item.id}
              url={item.image_url}
              author={item.author}
              comments={item.comments}
            />
          )}
        />
          )}
    </Space>
  )
}

export default DashboardScreen
