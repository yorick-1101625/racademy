import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = Dimensions.get('window').width;
      setIsSmallScreen(screenWidth <= 600);
    };

    updateLayout();
    const subscription = Dimensions.addEventListener('change', updateLayout);

    Promise.all([
      fetch('http://localhost:5000/api/user').then(res => res.json()),
      fetch('http://localhost:5000/api/post').then(res => res.json()),
    ])
      .then(([userData, postData]) => {
        if (userData.success) {
          setUsers(userData.data);
        } else {
          setError('Failed to fetch users');
        }

        if (postData.success && Array.isArray(postData.data)) {
          setPosts(postData.data);
        } else {
          console.warn('Post data not in expected format:', postData);
        }
      })
      .catch(err => {
        setError('Error fetching data');
        console.error(err);
      })
      .finally(() => setLoading(false));

    return () => {
      subscription.remove();
    };
  }, []);

  const removeUser = (userId) => {
    fetch(`http://localhost:5000/api/user/${userId}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUsers(users.filter(u => u.id !== userId));
        }
      })
      .catch(err => {
        console.error('Error removing user', err);
      });
  };

  const getPostCountForUser = (userId) => {
    return posts.filter(p => p.user_id === userId).length;
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {users.map((u) => (
          <View
            key={u.id}
            style={{
              width: isSmallScreen ? '100%' : '48%',
              marginBottom: 24,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <Image
              source={{ uri: `http://localhost:5000/${u.profile_picture}` }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                resizeMode: 'cover',
                marginRight: 12,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{u.username || 'Naam onbekend'}</Text>
              <Text style={{ fontSize: 14, color: '#4B5563' }}>{u.email}</Text>
              <Text style={{ fontSize: 14, color: '#374151' }}>
                Studie: {u.study || 'Onbekend'}
              </Text>
              <Text style={{ fontSize: 14, color: '#374151' }}>
                {getPostCountForUser(u.id)} posts
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#E5E7EB',
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                    borderRadius: 999,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '500' }}>Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => removeUser(u.id)}
                  style={{
                    backgroundColor: '#DC2626',
                    paddingVertical: 6,
                    paddingHorizontal: 14,
                    borderRadius: 999,
                  }}
                >
                  <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '500' }}>
                    Verwijder
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
