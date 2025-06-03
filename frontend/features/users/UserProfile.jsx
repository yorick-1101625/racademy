import {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator, ScrollView, Pressable, ImageBackground, Switch} from 'react-native';
import {Link, useLocalSearchParams, useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from '../../hooks/useFetch';
import useUser from '../../hooks/useUser';
import { BASE_URL } from '../../utils/url';
import Post from '../../features/feed/components/post/Post';
import Source from '../../features/feed/components/source/Source';
import TopTabs from '../../components/TopTabs';
import InfiniteScrollList from "@/components/InfiniteScrollList";
import Kebab from '@/components/Kebab';
import { showSuccess, showError } from '../../utils/toast';

export default function UserProfile({user}) {
    const router = useRouter();
    const [userData, setUserData] = useState(user);
    const [activeTab, setActiveTab] = useState('bookmarked-posts');
    const {user: loggedInUser} = useUser();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            const accessToken = await AsyncStorage.getItem('access');
            setToken(accessToken);
        };
        loadToken();
    }, []);

  const toggleUserField = async (field, value) => {
    try {
        const payload = {
            user_id: userData.id,
            [field]: Boolean(value),
        };

        const res = await fetch(`${BASE_URL}/api/user/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const json = await res.json();
        console.log("PATCH response", res.status, json);

        if (res.ok) {
            showSuccess('Succesvol', `Gebruiker ${field === "is_admin" ? "adminrechten" : "blokkeerstatus"} is bijgewerkt.`);
            setUserData(prev => ({
                ...prev,
                [field]: Boolean(value),
            }));
        } else {
            showError('Fout', `Kon ${field === "is_admin" ? "adminrechten" : "blokkeerstatus"} niet bijwerken.`);
            console.error("Update mislukt", json);
        }
    } catch (err) {
        showError('Fout', `Er is een fout opgetreden bij het bijwerken van ${field === "is_admin" ? "adminrechten" : "blokkeerstatus"}.`);
        console.error("Toggle error:", err);
    }
};


    const tabs = [
        {value: 'bookmarked-posts', label: 'Favoriete Posts'},
        {value: 'bookmarked-sources', label: 'Favoriete Bronnen'},
        {value: 'likes', label: 'Likes'},
        {value: 'sources', label: 'Bronnen'},
        {value: 'posts', label: 'Posts'},
    ];

    return (
        <View className="flex-1">
            <ImageBackground
                source={{uri: 'https://images.hogeschoolrotterdam.nl/Blob/113c5d6411e34ffdba8d23bd7da9f02c/0873435aebe643bcbd4a983b46de7842.jpg?mode=crop&quality=90&format=jpg&width=1869&height=539'}}
                className="h-24 px-4 flex-row items-end justify-between pb-2"
                resizeMode="cover"
            />

            <View className="bg-white px-4 relative">
                <Image
                    source={{uri: `${BASE_URL}${userData.profile_picture}`}}
                    className="w-24 h-24 rounded-full border-4 border-white absolute -top-12"
                />

                <View className="mt-16">
                    <View className="flex-row justify-between items-end mt-2">
                        <Text className="text-xl font-bold">{userData.username}</Text>
                        {loggedInUser && loggedInUser.id === userData.id && (
                            <Pressable onPress={() => router.push('/profile/edit')}>
                                <Text className="px-4 py-1 border border-rac text-rac rounded-md">
                                    Bewerk profiel
                                </Text>
                            </Pressable>
                        )}
                    </View>

                    <Text className="text-gray-600 mt-1">{userData.study}</Text>

                    <View className="flex-row mt-2 space-x-4">
                        <Text className="text-sm">
                            <Text className="font-bold">{userData.total_likes ?? 0}</Text> Likes
                        </Text>
                        <Text className="text-sm ml-2">
                            <Text className="font-bold">
                                {(userData.total_bookmarked_posts ?? 0) + (userData.total_bookmarked_sources ?? 0)}
                            </Text> Favorieten
                        </Text>
                    </View>
                </View>

                {loggedInUser?.is_admin && loggedInUser?.id !== userData.id && (
                    <Kebab>
                        <View className="px-2 py-1">
                            <Text className="font-medium">Admin</Text>
                            <Switch
                                value={userData.is_admin}
                                onValueChange={(val) => toggleUserField("is_admin", val)}
                            />
                        </View>
                        <View className="px-2 py-1 mt-1">
                            <Text className="font-medium">Geblokkeerd</Text>
                            <Switch
                                value={userData.is_blocked}
                                onValueChange={(val) => toggleUserField("is_blocked", val)}
                            />
                        </View>
                    </Kebab>
                )}
            </View>

            <View className="bg-white px-4">
                <TopTabs tabs={tabs} state={[activeTab, setActiveTab]}/>
            </View>

            <View className="flex-1">
                {activeTab === 'bookmarked-posts' && (
                    <InfiniteScrollList
                        url={`/api/user/${userData.id}/bookmarked/posts`}
                        renderItem={({item}) => <Post post={item}/>}
                        noResultsMessage="Geen posts gevonden."
                    />
                )}
                {activeTab === 'bookmarked-sources' && (
                    <InfiniteScrollList
                        url={`/api/user/${userData.id}/bookmarked/sources`}
                        renderItem={({item}) => <Source source={item}/>}
                        noResultsMessage="Geen bronnen gevonden."
                    />
                )}
                {activeTab === 'likes' && (
                    <InfiniteScrollList
                        url={`/api/user/${userData.id}/liked`}
                        renderItem={({item}) => <Post post={item}/>}
                        noResultsMessage="Geen gelikete posts gevonden."
                    />
                )}
                {activeTab === 'sources' && (
                    <InfiniteScrollList
                        url="/api/source"
                        renderItem={({item}) => <Source source={item}/>}
                        params={`user_id=${userData.id}`}
                        noResultsMessage="Kon geen bronnen vinden."
                    />
                )}
                {activeTab === 'posts' && (
                    <InfiniteScrollList
                        url="/api/post"
                        renderItem={({item}) => <Post post={item}/>}
                        params={`user_id=${userData.id}`}
                        noResultsMessage="Kon geen posts vinden."
                    />
                )}
            </View>
        </View>
    );
}
