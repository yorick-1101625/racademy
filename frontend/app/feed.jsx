import React from 'react';
import { View } from 'react-native';
import PostList from '../components/PostList';

const PostsPage = () => {
  return (
    <View style={{ padding: 20 }}>
      <PostList />
    </View>
  );
};

export default PostsPage;
