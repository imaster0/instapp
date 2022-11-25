import { Text, View } from 'react-native'
import Avatar from './Avatar'
import Space from './Space'

interface CommentProps {
  id: number
  creator_uuid: string
  text: string
}

interface Props {
  style: any
  comment: CommentProps
}

const Comment = ({ comment, style }: Props) => (
  <Space direction="row" style={style}>
    <Avatar userId={comment.creator_uuid} />
    <Text>{comment.text}</Text>
  </Space>
)

export default Comment
