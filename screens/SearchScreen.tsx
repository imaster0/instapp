import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import Avatar from '../components/Avatar'
import GridList from '../components/GridList'
import Header from '../components/Header/Header'
import Space from '../components/Space'
import TextInput from '../components/TextInput'
import theme from '../Theme'

const SearchScreen = () => {
  const [search, setSearch] = useState('')
  const handleSearch = (value) => {
    setSearch(value)
  }

  const images = ['a', 'b', 'c'].filter(
    (label) => search === '' || label.indexOf(search)
  )

  const people = [{ name: 'a' }, { name: 'a' }, { name: 'a' }].filter(
    (person) => search === '' || person.name.indexOf(search)
  )

  const renderItem = ({ item }) => (
    <Space direction="row" style={{ alignItems: 'center' }}>
      <Avatar />
      <Text style={{ color: 'red' }}>{item.name}</Text>
    </Space>
  )

  return (
    <Space style={{ padding: theme.margins.screen }}>
      <TextInput placeholder="Search" onChangeText={handleSearch} />
      <Header>Images</Header>
      <GridList posts={images} />
      <Header>People</Header>
      <FlatList data={people} renderItem={renderItem} />
    </Space>
  )
}

export default SearchScreen
