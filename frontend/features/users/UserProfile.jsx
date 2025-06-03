import {useState} from 'react';
import {View, Text, Image, ActivityIndicator, ScrollView, Pressable, ImageBackground} from 'react-native';
import {Link, useLocalSearchParams, useRouter} from 'expo-router';
import useFetch from '../../hooks/useFetch';
import useUser from '../../hooks/useUser';
import {BASE_URL} from '../../utils/url';
import Error from '../../components/Error';
import Post from '../../features/feed/components/post/Post';
import Source from '../../features/feed/components/source/Source';
import TopTabs from '../../components/TopTabs';
import InfiniteScrollList from "@/components/InfiniteScrollList";

export default function UserProfile({user}) {

    const [activeTab, setActiveTab] = useState('bookmarked-posts');

    const tabs = [
        {value: 'bookmarked-posts', label: 'Favoriete Posts'},
        {value: 'bookmarked-sources', label: 'Favoriete Bronnen'},
        {value: 'likes', label: 'Likes'},
        {value: 'sources', label: 'Bronnen'},
        {value: 'posts', label: 'Posts'},
    ];

    return (
        <View className="flex-1">

            {/*<View className="bg-black h-24 px-4 flex-row items-end justify-between pb-2"></View>*/}

            <ImageBackground
                source={{uri: 'https://images.hogeschoolrotterdam.nl/Blob/113c5d6411e34ffdba8d23bd7da9f02c/0873435aebe643bcbd4a983b46de7842.jpg?mode=crop&quality=90&format=jpg&width=1869&height=539'}} // or require('path/to/local/image.jpg')
                className="h-24 px-4 flex-row items-end justify-between pb-2"
                resizeMode="cover"
            >
            </ImageBackground>

            <View className="bg-white px-4 relative">
                <Image
                    source={{uri: `${BASE_URL}${user.profile_picture}`}}
                    className="w-24 h-24 rounded-full border-4 border-white absolute -top-12"
                />

                <View className="mt-16">
                    <View className="flex-row justify-between items-end mt-2">
                        <Text className="text-xl font-bold">{user.username}</Text>
                        <Link href={'/profile/edit'}>
                            <Text className="px-4 py-1 border border-rac text-rac rounded-md">Bewerk profiel</Text>
                            {/*<Feather name="edit" size={24} color="black" />*/}
                        </Link>
                    </View>

                    <Text className="text-gray-600 mt-1">{user.study}</Text>

                    <View className="flex-row mt-2 space-x-4">
                        <Text className="text-sm"><Text className="font-bold">...</Text> Likes</Text>
                        <Text className="text-sm ml-2"><Text className="font-bold">...</Text> Favorieten</Text>
                    </View>
                </View>
            </View>

            <View className="bg-white px-4 ">
                <TopTabs tabs={tabs} state={[activeTab, setActiveTab]}/>
            </View>

            {/* Tab Content */}
            <View className="flex-1">
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