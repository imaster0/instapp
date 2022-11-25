import React, { useMemo, useState } from 'react'
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Text,
  View
} from 'react-native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Comment from '../../components/Comment'
import { addComment, getPostDetails } from '../../Api'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { DashboardStackParamList } from '../../App'
import TextInput from '../../components/TextInput'
import theme from '../../Theme'
import Space from '../../components/Space'

type Props = NativeStackNavigationProp<DashboardStackParamList, 'post'>

const PostScreen = ({ route }) => {
  const [text, setText] = useState<string>('')
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['post-details', route.params.id],
    queryFn: async () => await getPostDetails(route.params.id)
  })

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['post-details', route.params.id]
      })
      setText('')
    }
  })

  const sortedComments = useMemo(() => {
    const comments = data?.comments
    comments.sort((a, b) => a.id < b.id)
    return comments
  }, [data?.comments])

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Image
        source={{ uri: data?.image_url }}
        style={{ width: 400, height: 300 }}
      />

      <Space
        style={{
          flex: 1,
          paddingBottom: 200
        }}
      >
        <Text>Description</Text>
        <Text>{data?.description}</Text>
        <Text>Comments</Text>
        <FlatList
          data={sortedComments}
          renderItem={({ item }) => (
            <Comment
              style={{ marginVertical: theme.spacings.base / 2 }}
              comment={item}
            />
          )}
        />
      </Space>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          position: 'absolute',
          width: '100%',
          bottom: 0,
          padding: theme.spacings.base
        }}
      >
        <TextInput
          placeholder="Write a comment"
          onChangeText={setText}
          value={text}
          onSubmitEditing={() =>
            mutation.mutate({ text, postId: route.params.id })
          }
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default PostScreen
