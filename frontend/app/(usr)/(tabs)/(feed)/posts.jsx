import {SafeAreaView} from 'react-native';
import InfiniteScrollList from "@/components/InfiniteScrollList";
import Post from "@/features/feed/components/post/Post";
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";
import {useCallback, useEffect, useState} from "react";

function Posts() {
    const {refresh: refreshParam} = useLocalSearchParams();
    const [refresh, setRefresh] = useState(0);

    useFocusEffect(
        useCallback(() => {
            if (refreshParam) {
                setRefresh(i => i + 1);
                router.replace('/posts');
            }
        }, [refreshParam])
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