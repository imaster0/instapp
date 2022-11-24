import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Button, FlatList, View } from 'react-native'
import { downloadFile, getPosts } from '../../Api'
import Avatar from '../../components/Avatar'
import Post from '../../components/Post'
import Space from '../../components/Space'
import { encode } from 'base64-arraybuffer'

const DashboardScreen = () => {
  const navigation = useNavigation()
  const [data, setData] = useState([])
  const fetchMoreData = () => {
    // setData([...data, { name: 'New' }])
  }

  const loadPosts = async () => {
    const response = await getPosts()
    if (response.error != null) {
      console.error(response.error)
      return
    }
    seta
  }

  return (
    <Space>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Avatar onPress={() => navigation.navigate('profile')} />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </View>
      <Button title="Abc" onPress={loadPosts} />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        renderItem={({ item }) => (
          <Post
            url={item.url}
            onImagePress={() => navigation.navigate('post')}
          />
        )}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
      />
    </Space>
  )
}

export default DashboardScreen
