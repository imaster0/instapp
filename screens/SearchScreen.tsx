import React, { useState } from 'react'
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Text,
  View
} from 'react-native'
import Avatar from '../components/Avatar'
import GridList from '../components/GridList'
import Header from '../components/Header/Header'
import Space from '../components/Space'
import TextInput from '../components/TextInput'
import theme from '../Theme'
import { useQuery } from '@tanstack/react-query'
import { getPosts, getPostsByDescription, getUsersByName } from '../Api'
import { throttle } from 'lodash'

const SearchScreen = () => {
  const [search, setSearch] = useState('')

  const images = useQuery({
    queryKey: ['posts-by-description', search],
    queryFn: async () => await getPostsByDescription(search)
  })

  const people = useQuery({
    queryKey: ['people-by-name', search],
    queryFn: async () => await getUsersByName(search)
  })

  const onSearch = throttle((search) => {
    setSearch(search)
    images.refetch()
    people.refetch()
  }, 800)

  const renderItem = ({ item }) => (
    <Space direction="row" style={{ alignItems: 'center' }}>
      <Avatar userId={item.uuid} imageUrl={item.image_url} />
      <Text style={{ color: 'red' }}>
        {item.first_name} {item.last_name}
      </Text>
    </Space>
  )

  return (
    <Space style={{ padding: theme.margins.screen, paddingBottom: 100 }}>
      <TextInput placeholder="Search" onChangeText={onSearch} />
      <Header>Images</Header>
      {images.isLoading
        ? (
        <ActivityIndicator style={{ flex: 1 }} />
          )
        : (
        <GridList posts={images.data} />
          )}
      <Header>People</Header>
      {people.isLoading
        ? (
        <ActivityIndicator style={{ flex: 1 }} />
          )
        : (
        <FlatList data={people.data} renderItem={renderItem} />
          )}
    </Space>
  )
}

export default SearchScreen
