import {Animated, SafeAreaView} from 'react-native';
import InfiniteScrollList from "@/components/InfiniteScrollList";
import Post from "@/features/feed/components/post/Post";
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";
import {useCallback, useEffect, useRef, useState} from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";

function Posts() {
    const {refresh: refreshParam} = useLocalSearchParams();
    const [refresh, setRefresh] = useState(0);

    const flatListRef = useRef(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        useCallback(() => {
            if (refreshParam) {
                setRefresh(i => i + 1);
                router.replace('/posts');
            }
        }, [refreshParam])
    );

    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({offset: 0, animated: true});
        }
    };

    // useEffect(() => {
    //     console.log('refreshFlag changed:', refreshFlag);
    // }, [refreshFlag]);

    return (
        <SafeAreaView className="flex-1">

            <InfiniteScrollList
                listRef={flatListRef}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: false}
                )}
                refresh={refresh}
                renderItem={({item}) => <Post post={item}/>}
                url="/api/post"
                params="sort=recent"
                noResultsMessage="Geen posts gevonden..."
            />
            <ScrollToTopButton onPress={scrollToTop} scrollY={scrollY}/>
        </SafeAreaView>
    );
}

export default Posts;