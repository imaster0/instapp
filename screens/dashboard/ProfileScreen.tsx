import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '../../components/Avatar'
import GridList from '../../components/GridList'
import Space from '../../components/Space'
import theme from '../../Theme'

const posts = [
  1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2,
  3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4,
  5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6,
  7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8,
  1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8
]

const ProfileScreen = () => (
  <SafeAreaView>
    <Space style={{ alignItems: 'center', padding: theme.margins.screen }}>
      <Avatar />
      <Text>Somebody</Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
        eligendi soluta incidunt dolorum officia debitis minus ullam eaque
        explicabo delectus, quae quis aliquam ducimus quas adipisci similique
        cum aut quos fugit dignissimos voluptatem. At, nesciunt est, perferendis
        ipsa soluta quas impedit laborum nam consectetur nisi enim amet corrupti
        quam. Ut.
      </Text>
      <GridList posts={posts} />
    </Space>
  </SafeAreaView>
)

export default ProfileScreen
