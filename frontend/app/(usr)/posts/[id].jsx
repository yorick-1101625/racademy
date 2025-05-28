import {ActivityIndicator, View} from 'react-native';
import {useLocalSearchParams, useNavigation} from "expo-router";
import useFetch from "@/hooks/useFetch";
import Error from "@/components/Error";
import Post from "@/features/feed/components/post/Post";
import {useLayoutEffect} from "react";
import Comment from "@/features/feed/components/comment/Comment";


function PostDetails() {
    const {id} = useLocalSearchParams();

    const {data: post, isPending, error} = useFetch(`/api/post/${id}`);

    const navigation = useNavigation();

    // Set tab title at the top of the screen
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => null,
        });
    }, [navigation]);

    if (isPending) return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#3daad3"/>
        </View>
    );

    if (error) return (
        <Error/>
    );

    return (
        <>
            <Post post={post}/>
            <Comment post_id={id}/>
        </>
    );
}

export default PostDetails;