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

export default function UserProfile({ user }) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('bookmarks');

  const tabs = [
    { value: 'bookmarks', label: 'Favorieten' },
    { value: 'likes', label: 'Likes' },
    { value: 'sources', label: 'Bronnen' },
    { value: 'posts', label: 'Posts' },
  ];

  return (
    <ScrollView className="p-6">
      <View className="items-end mb-2">
          <Pressable onPress={() => router.push('/profile/edit')}>
            <Text className="text-blue-500 font-medium">Bewerk profiel</Text>
          </Pressable>
      </View>

      <View className="items-center mb-6">
        <Image
          source={{ uri: `${BASE_URL}${user.profile_picture}` }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-xl font-bold">{user.username}</Text>
          {
            user.study &&
            <Text className="text-gray-600 text-sm">{user.study}</Text>
          }
        {/*<Text className="text-sm mt-1">{userPosts.length} posts | {userSources.length} bronnen</Text>*/}
      </View>

      <TopTabs tabs={tabs} state={[activeTab, setActiveTab]} />

      {/*/!* Tab Content *!/*/}
      {/*<View className="mt-6">*/}
      {/*  {activeTab === 'favorieten' && (*/}
      {/*    <Text className="text-center text-gray-400">[Favorieten komen hier]</Text>*/}
      {/*  )}*/}
      {/*  {activeTab === 'likes' && (*/}
      {/*    <Text className="text-center text-gray-400">[Likes komen hier]</Text>*/}
      {/*  )}*/}
      {/*  {activeTab === 'bronnen' && (*/}
      {/*    <>*/}
      {/*      {userSources.length > 0 ? (*/}
      {/*        userSources.map(source => (*/}
      {/*          <Source key={source.id} source={source} />*/}
      {/*        ))*/}
      {/*      ) : (*/}
      {/*        <Text className="text-center text-gray-400">Geen bronnen gevonden</Text>*/}
      {/*      )}*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*  {activeTab === 'posts' && (*/}
      {/*    <>*/}
      {/*      {userPosts.length > 0 ? (*/}
      {/*        userPosts.map(post => (*/}
      {/*          <Post key={post.id} post={post} />*/}
      {/*        ))*/}
      {/*      ) : (*/}
      {/*        <Text className="text-center text-gray-400">Geen posts gevonden</Text>*/}
      {/*      )}*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*</View>*/}
    </ScrollView>
  );
}