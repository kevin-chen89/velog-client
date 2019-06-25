import * as React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import PostCommentItem from './PostCommentItem';

const PostCommentsListBlock = styled.div``;

export interface PostCommentsListProps {
  comments: Comment[];
  currentUserId: null | string;
  onRemove: (id: string) => any;
}

const PostCommentsList: React.FC<PostCommentsListProps> = ({
  comments,
  currentUserId,
  onRemove,
}) => {
  return (
    <PostCommentsListBlock>
      {comments.map(comment => (
        <PostCommentItem
          comment={comment}
          key={comment.id}
          ownComment={currentUserId === (comment.user && comment.user.id)}
          onRemove={onRemove}
        />
      ))}
    </PostCommentsListBlock>
  );
};

export default PostCommentsList;
