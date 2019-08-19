import React, { useCallback } from 'react';
import PostCardList from '../../components/common/PostCardList';
import { GET_POST_LIST, PartialPost } from '../../lib/graphql/post';
import { useQuery } from '@apollo/react-hooks';
import PaginateWithScroll from '../../components/common/PaginateWithScroll';

interface RecentPostsProps {}

const RecentPosts: React.SFC<RecentPostsProps> = props => {
  const getPostList = useQuery<{ posts: PartialPost[] }>(GET_POST_LIST);

  const { data } = getPostList;
  const onLoadMore = useCallback(
    (cursor: string) => {
      getPostList.fetchMore({
        variables: {
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            posts: [...prev.posts, ...fetchMoreResult.posts],
          };
        },
      });
    },
    [getPostList],
  );

  if (!data || !data.posts) return null;

  const cursor = data.posts[data.posts.length - 1].id;

  return (
    <>
      <PostCardList posts={data.posts} />
      <PaginateWithScroll cursor={cursor} onLoadMore={onLoadMore} />
    </>
  );
};

export default RecentPosts;
