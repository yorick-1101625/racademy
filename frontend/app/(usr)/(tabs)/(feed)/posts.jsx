import {SafeAreaView} from 'react-native';
import InfiniteScrollList from "@/components/InfiniteScrollList";
import Post from "@/features/feed/components/post/Post";
import {useFocusEffect} from "expo-router";
import {useCallback, useEffect, useState} from "react";

function Posts() {
    const [refresh, setRefresh] = useState(0);

    useFocusEffect(
        useCallback(() => {
            setRefresh(i => i + 1);
        }, [])
    );

    // useEffect(() => {
    //     console.log('refreshFlag changed:', refreshFlag);
    // }, [refreshFlag]);

    return (
        <SafeAreaView className="flex-1">

            <InfiniteScrollList
                refresh={refresh}
                renderItem={({item}) => <Post post={item}/>}
                url="/api/post"
                params="sort=recent"
                noResultsMessage="Geen posts gevonden..."
            />

        </SafeAreaView>
    );
}

export default Posts;