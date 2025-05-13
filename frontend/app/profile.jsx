import { useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import useFetch from '../hooks/useFetch';
import useUser from "@/hooks/useUser";
import {BASE_URL} from "@/utils/url";

export default function Profile() {
  const { user } = useUser;
  const { data: users, isPending, error } = useFetch('/api/user/');
  const { data: posts } = useFetch('/api/post');
  const [activeTab, setActiveTab] = useState('favorieten');

  if (!user) return <Text className="text-center mt-10">Niet ingelogd.</Text>;
  if (isPending) return <ActivityIndicator size="large" className="mt-10" />;
  if (error) return <Text className="text-center mt-10">{error}</Text>;

  const currentUser = users?.find(u => u.id === user.id);
  const userPosts = posts?.filter(p => p.user_id === user.id) || [];

  if (!currentUser) return <Text className="text-center mt-10">Gebruiker niet gevonden.</Text>;

  return (
    <ScrollView className="p-6">
      {/* Bewerken knop */}
      <View className="items-end mb-2">
        <Pressable onPress={() => {}}>
          <Text className="text-blue-500 font-medium">Bewerk profiel</Text>
        </Pressable>
      </View>

      {/* Gebruikersinfo */}
      <View className="items-center mb-6">
        <Image
          source={{ uri: `${BASE_URL}${currentUser.profile_picture}` }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-xl font-bold">{currentUser.username || 'Naam onbekend'}</Text>
        <Text className="text-gray-600 text-sm">{currentUser.study || 'Studie onbekend'}</Text>
        <Text className="text-sm mt-1">{userPosts.length} posts</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-around mt-4">
        {['favorieten', 'likes', 'bronnen', 'posts'].map(tab => (
          <Text
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`font-semibold capitalize ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'}`}
          >
            {tab}
          </Text>
        ))}
      </View>

      {/* Tab Content */}
      <View className="mt-6">
        {activeTab === 'favorieten' && (
          <Text className="text-center text-gray-400">[Favorieten komen hier]</Text>
        )}
        {activeTab === 'likes' && (
          <Text className="text-center text-gray-400">[Likes komen hier]</Text>
        )}
        {activeTab === 'bronnen' && (
          <Text className="text-center text-gray-400">[Bronnen komen hier]</Text>
        )}
        {activeTab === 'posts' && (
          <>
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <Text key={post.id} className="text-center mb-2">
                  {post.title}
                </Text>
              ))
            ) : (
              <Text className="text-center text-gray-400">Geen posts gevonden</Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}
