import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import Avatar from '../../components/Avatar'
import Post from '../../components/Post'

const DashboardScreen = () => {
  const navigation = useNavigation()
  const [data, setData] = useState([
    { name: 'First' },
    { name: 'First' },
    { name: 'First' },
    { name: 'First' },
    { name: 'First' }
  ])
  const fetchMoreData = () => {
    setData([...data, { name: 'New' }])
  }

  return (
    <View>
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
            name={item.name}
            onImagePress={() => navigation.navigate('post')}
          />
        )}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
      />
    </View>
  )
}

export default DashboardScreen
