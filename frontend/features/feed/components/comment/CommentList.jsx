import Comment from "@/features/feed/components/comment/Comment";
import useFetch from "@/hooks/useFetch";
import {ActivityIndicator, FlatList, View} from "react-native";
import Error from "@/components/Error";
import NoResults from "@/features/search/components/NoResults";
import React from "react";

function CommentList({ post_id }) {
    const url = `/api/comment/${post_id}`;
    const { data: comments, isPending, error } = useFetch(url);

    if (isPending) return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#3daad3" />
        </View>
    );

    if (error) return <Error />;

    if (!comments || comments.length === 0) {
        return <NoResults title="" message="" />;
    }

    return (
        <FlatList
            data={comments}
            renderItem={({ item }) => <Comment comment={item} />}
            keyExtractor={(comment) => comment.id.toString()}
        />
    );
}


export default CommentList;