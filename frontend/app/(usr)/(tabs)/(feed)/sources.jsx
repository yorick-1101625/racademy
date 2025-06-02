import {Animated, SafeAreaView} from 'react-native'
import InfiniteScrollList from "@/components/InfiniteScrollList";
import Source from "@/features/feed/components/source/Source";
import {useCallback, useRef, useState} from "react";
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";
import ScrollToTopButton from "@/components/ScrollToTopButton";

function Sources() {
    const {refresh: refreshParam} = useLocalSearchParams();
    const [refresh, setRefresh] = useState(0);

    const flatListRef = useRef(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        useCallback(() => {
            if (refreshParam) {
                setRefresh(i => i + 1);
                router.replace('/sources');
            }
        }, [refreshParam])
    );

    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({offset: 0, animated: true});
        }
    };

    return (
        <SafeAreaView className="flex-1 relative">

            <InfiniteScrollList
                listRef={flatListRef}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: false}
                )}
                refresh={refresh}
                renderItem={({item}) => <Source source={item}/>}
                url="/api/source"
                params="sort=recent"
                noResultsMessage="Geen bronnen gevonden..."
            />
            <ScrollToTopButton onPress={scrollToTop} scrollY={scrollY}/>
        </SafeAreaView>
    );
}

export default Sources;