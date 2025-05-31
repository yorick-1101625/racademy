import { useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useFetch from '../../hooks/useFetch';
import useUser from '../../hooks/useUser';
import { BASE_URL } from '../../utils/url';
import Error from '../../components/Error';
import Post from '../../features/feed/components/post/Post';
import Source from '../../features/feed/components/source/Source';
import TopTabs from '../../components/TopTabs';

export default function Profile() {
  const { user } = useUser();
  const { id: userIdParam } = useLocalSearchParams();
  const userId = userIdParam || (user ? user.id : null);
  const router = useRouter();

  const { data: currentUser, isPending, error } = useFetch(userId ? `/api/user/${userId}` : null);
  const { data: posts } = useFetch(userId ? `/api/post?user_id=${userId}` : null);
  const { data: sources } = useFetch(userId ? `/api/source?user_id=${userId}` : null);
  const { data: likedPosts } = useFetch(userId ? `/api/user/${userId}/liked-posts` : null);
  const { data: bookmarkedPostsRaw } = useFetch(userId ? `/api/user/${userId}/bookmarked-posts` : null);
  const [activeTab, setActiveTab] = useState('favorieten');

  const bookmarkedPostList = bookmarkedPostsRaw?.posts || [];
  const bookmarkedSourceList = bookmarkedPostsRaw?.sources || [];

  if (!userId) return <Text className="text-center mt-10">Geen gebruiker geselecteerd.</Text>;
  if (isPending) return <ActivityIndicator className="mt-10" color="#3daad3" />;
  if (error) return <Error />;

  const userPosts = posts || [];
  const userSources = sources || [];

  if (!currentUser) return <Text className="text-center mt-10">Gebruiker niet gevonden.</Text>;

  const tabs = [
    { value: 'favorieten', label: 'Favorieten' },
    { value: 'likes', label: 'Likes' },
    { value: 'bronnen', label: 'Bronnen' },
    { value: 'posts', label: 'Posts' },
  ];

  return (
    <ScrollView className="p-6">
      <View className="items-end mb-2">
        {user && user.id === currentUser.id && (
          <Pressable onPress={() => router.push('/profile/edit')}>
            <Text className="text-blue-500 font-medium">Bewerk profiel</Text>
          </Pressable>
        )}
      </View>

      <View className="items-center mb-6">
        <Image
          source={{ uri: `${BASE_URL}${currentUser.profile_picture}` }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-xl font-bold">{currentUser.username || 'Naam onbekend'}</Text>
        <Text className="text-gray-600 text-sm">{currentUser.study || 'Studie onbekend'}</Text>
        <Text className="text-sm mt-1">{userPosts.length} posts | {userSources.length} bronnen</Text>
      </View>

      <TopTabs tabs={tabs} state={[activeTab, setActiveTab]} />

      {/* Tab Content */}
      <View className="mt-6">
        {activeTab === 'favorieten' && (
          <>
            {bookmarkedPostList.length > 0 || bookmarkedSourceList.length > 0 ? (
              <>
                {bookmarkedPostList.map(post => (
                  <Post key={`bm-post-${post.id}`} post={post} />
                ))}
                {bookmarkedSourceList.map(source => (
                  <Source key={`bm-source-${source.id}`} source={source} />
                ))}
              </>
            ) : (
              <Text className="text-center text-gray-400">Geen favorieten gevonden</Text>
            )}
          </>
        )}
        {activeTab === 'likes' && (
          <>
            {likedPosts && likedPosts.length > 0 ? (
              likedPosts.map(post => (
                <Post key={post.id} post={post} />
              ))
            ) : (
              <Text className="text-center text-gray-400">Geen likes gevonden</Text>
            )}
          </>
        )}
        {activeTab === 'bronnen' && (
          <>
            {userSources.length > 0 ? (
              userSources.map(source => (
                <Source key={source.id} source={source} />
              ))
            ) : (
              <Text className="text-center text-gray-400">Geen bronnen gevonden</Text>
            )}
          </>
        )}
        {activeTab === 'posts' && (
          <>
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <Post key={post.id} post={post} />
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
