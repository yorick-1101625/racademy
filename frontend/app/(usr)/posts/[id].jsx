import {ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, View} from 'react-native';
import {router, useFocusEffect, useLocalSearchParams, useNavigation} from "expo-router";
import useFetch from "@/hooks/useFetch";
import Error from "@/components/Error";
import Post from "@/features/feed/components/post/Post";
import React, {useCallback, useLayoutEffect, useState} from "react";
import CommentCreate from "@/features/feed/components/comment/CommentCreate";
import CommentList from "@/features/feed/components/comment/CommentList";
import InfiniteScrollList from "@/components/InfiniteScrollList";
import Comment from "@/features/feed/components/comment/Comment";


function PostDetails() {
    const {id} = useLocalSearchParams();
    const {data: post, isPending, error} = useFetch(`/api/post/${id}`);
    const {refresh: refreshParam} = useLocalSearchParams();
    const [refresh, setRefresh] = useState(0);

    useFocusEffect(
        useCallback(() => {
            if (refreshParam) {
                setRefresh(i => i + 1);
                router.replace(`/posts/${id}`);
            }
        }, [refreshParam])
    );

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
                        {/*<CommentList post_id={id}/>*/}
                        <InfiniteScrollList
                            refresh={refresh}
                            renderItem={({item}) => <Comment comment={item} post_id={id}/>}
                            url={`/api/comment/${id}`}
                            params="sort=recent"
                            noResultsTitle=""
                            noResultsMessage=""
                        />
                    </View>

                    <CommentCreate postId={id}/>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}

export default PostDetails;