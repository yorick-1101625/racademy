import {useState} from 'react';
import {View, Text, Image, ActivityIndicator, ScrollView, Pressable} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import useFetch from '../../hooks/useFetch';
import useUser from '../../hooks/useUser';
import {BASE_URL} from '../../utils/url';
import Error from '../../components/Error';
import Post from '../../features/feed/components/post/Post';
import Source from '../../features/feed/components/source/Source';
import TopTabs from '../../components/TopTabs';
import InfiniteScrollList from "@/components/InfiniteScrollList";

export default function UserProfile({user}) {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState('bookmarked-posts');

    const tabs = [
        {value: 'bookmarked-posts', label: 'Favoriete Posts'},
        {value: 'bookmarked-sources', label: 'Favoriete Bronnen'},
        {value: 'likes', label: 'Likes'},
        {value: 'sources', label: 'Bronnen'},
        {value: 'posts', label: 'Posts'},
    ];

    return (
        <View className="p-6 flex-1">
            <View className="items-end mb-2">
                <Pressable onPress={() => router.push('/profile/edit')}>
                    <Text className="text-blue-500 font-medium">Bewerk profiel</Text>
                </Pressable>
            </View>

            <View className="items-center mb-6">
                <Image
                    source={{uri: `${BASE_URL}${user.profile_picture}`}}
                    className="w-24 h-24 rounded-full mb-4"
                />
                <Text className="text-xl font-bold">{user.username}</Text>
                {
                    user.study &&
                    <Text className="text-gray-600 text-sm">{user.study}</Text>
                }
                {/*<Text className="text-sm mt-1">{userPosts.length} posts | {userSources.length} bronnen</Text>*/}
            </View>

            <View>
                <TopTabs tabs={tabs} state={[activeTab, setActiveTab]}/>
            </View>

            {/* Tab Content */}
            <View className="mt-6 flex-1">
                {activeTab === 'bookmarked-posts' && (
                  <InfiniteScrollList
                    url={`/api/user/${user.id}/bookmarked/posts`}
                    renderItem={({item}) => <Post post={item}/>}
                    noResultsMessage="Geen posts gevonden."
                  />
                )}
                {activeTab === 'bookmarked-sources' && (
                  <InfiniteScrollList
                    url={`/api/user/${user.id}/bookmarked/sources`}
                    renderItem={({item}) => <Source source={item}/>}
                    noResultsMessage="Geen bronnen gevonden."
                  />
                )}
                {activeTab === 'likes' && (
                  <InfiniteScrollList
                    url={`/api/user/${user.id}/liked`}
                    renderItem={({item}) => <Post post={item}/>}
                    noResultsMessage="Geen gelikete posts gevonden."
                  />
                )}
                {activeTab === 'sources' && (
                    <InfiniteScrollList
                        url="/api/source"
                        renderItem={({item}) => <Source source={item}/>}
                        params={`user_id=${user.id}`}
                        noResultsMessage="Kon geen bronnen vinden."
                    />
                )}
                {activeTab === 'posts' && (
                    <InfiniteScrollList
                        url="/api/post"
                        renderItem={({item}) => <Post post={item}/>}
                        params={`user_id=${user.id}`}
                        noResultsMessage="Kon geen posts vinden."
                    />
                )}
            </View>
        </View>
    );
}