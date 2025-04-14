import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/post/')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data);
        }
        else {
          setError('Failed to fetch posts');
        }
      })
      .catch((err) => {
        setError('Error fetching posts: ' + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default PostList;
