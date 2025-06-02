import {ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, View} from 'react-native';
import {useLocalSearchParams, useNavigation} from "expo-router";
import useFetch from "@/hooks/useFetch";
import Error from "@/components/Error";
import Post from "@/features/feed/components/post/Post";
import {useLayoutEffect} from "react";
import CommentCreate from "@/features/feed/components/comment/CommentCreate";
import CommentList from "@/features/feed/components/comment/CommentList";


function PostDetails() {
    const {id} = useLocalSearchParams();

    const {data: post, isPending, error} = useFetch(`/api/post/${id}`);

    const navigation = useNavigation();

    // Set tab title at the top of the screen
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => "",
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
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
                >
                    <View className="flex-1">
                        <Post post={post}/>
                        <CommentList post_id={id}/>
                    </View>

                    <CommentCreate postId={id}/>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}

export default PostDetails;