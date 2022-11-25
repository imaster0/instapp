import React, { useEffect } from 'react'
import { Button, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query'
import Avatar from '../../components/Avatar'
import GridList from '../../components/GridList'
import Space from '../../components/Space'
import theme from '../../Theme'
import { getAuth, getUser, signOut } from '../../Api'
import { useAuth } from '../../AuthContextProvider'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const posts = [
  1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2
]

const ProfileScreen = ({ route }) => {
  const { userId } = useAuth()
  const tabBarHeight = useBottomTabBarHeight()
  const { data } = useQuery({
    queryKey: ['profile', route.params.id || 0],
    queryFn: async () => await getUser(route.params.id || 0)
  })

  const logOut = async () => await signOut()

  return (
    <Space
      style={{
        alignItems: 'center',
        padding: theme.margins.screen
      }}
    >
      <Avatar />
      {userId === route.params.id && (
        <Button title="Log out" onPress={logOut} />
      )}
      <Text>Somebody</Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
        eligendi soluta incidunt dolorum officia debitis minus ullam eaque
        explicabo delectus, quae quis aliquam ducimus quas adipisci similique
        cum aut quos fugit dignissimos voluptatem. At, nesciunt est, perferendis
        ipsa soluta quas impedit laborum nam consectetur nisi enim amet corrupti
        quam. Ut.
      </Text>
      <GridList posts={posts} style={{ paddingBottom: tabBarHeight + 50 }} />
    </Space>
  )
}

export default ProfileScreen
