import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import {
  ActivityIndicator,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text
} from 'react-native'
import Space from '../components/Space'
import TextInput from '../components/TextInput'
import theme from '../Theme'
import { addPost, getPublicUrl, uploadFile } from '../Api'
import { useNavigation } from '@react-navigation/native'
import { decode } from 'base64-arraybuffer'
import { useAuth } from '../AuthContextProvider'

const AddPostScreen = () => {
  const navigation = useNavigation()
  const [image, setImage] = useState<string | null>(null)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const { setLoading } = useAuth()

  const clear = () => {
    setImage(null)
    setTitle('')
    setDescription('')
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const result = await uploadFile(decode(image!))
      const url = await getPublicUrl(result.data!.path)
      await addPost(description, url)
      navigation.navigate('Dashboard')
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const capturePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].base64!)
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].base64!)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ height: '100%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <ScrollView style={{ flex: 1 }}>
        {image == null
          ? (
          <Image
            source={{
              uri: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'
            }}
            style={{ width: 400, height: 300 }}
          />
            )
          : (
          <Image
            source={{ uri: `data:image/jpg;base64,${image}` }}
            style={{ width: 400, height: 300 }}
          />
            )}

        <Space
          style={{
            flex: 1,
            alignItems: 'stretch',
            padding: theme.margins.screen
          }}
        >
          <Space direction="row" style={{ justifyContent: 'center' }}>
            <Button title="Capture a photo" onPress={capturePhoto} />
            <Button title="Camera roll" onPress={pickImage} />
          </Space>
          <Text>Title</Text>
          <TextInput
            onChangeText={(value) => setTitle(value)}
            returnKeyType="next"
          />
          <Text>Description</Text>
          <TextInput
            style={{ textAlignVertical: 'top' }}
            multiline
            numberOfLines={4}
            onChangeText={(value) => setDescription(value)}
          />
          <Space direction="row" style={{ justifyContent: 'center' }}>
            <Button
              title="Cancel"
              color={theme.colors.danger}
              onPress={clear}
            />
            <Button title="Submit" onPress={handleSubmit} />
          </Space>
        </Space>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AddPostScreen
