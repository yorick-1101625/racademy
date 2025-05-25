import {ActivityIndicator, FlatList, View} from 'react-native';
import Post from "./Post";
import useFetch from "@/hooks/useFetch";
import NoResults from "@/features/search/components/NoResults";
import Error from "@/components/Error"
import React from "react";

function PostList({url = `/api/post?sort=recent`}) {

    const {data: posts, isPending, error} = useFetch(url);

    if (isPending) return <View className="flex-1 justify-center items-center">
                            <ActivityIndicator size="large" color="#3daad3"/>
                        </View>;
    if (error) return <Error />;

    if (!posts || posts.length === 0) {
        return (
            <NoResults message="Geen posts gevonden voor je zoekopdracht."/>
        );
    }

    return (<FlatList
            data={posts}
            renderItem={({item}) => <Post post={item}/>}
            keyExtractor={(post) => post.id.toString()}
        />);
}

export default PostList;