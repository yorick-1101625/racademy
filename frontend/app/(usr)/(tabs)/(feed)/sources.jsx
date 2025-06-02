import {SafeAreaView} from 'react-native'
import InfiniteScrollList from "@/components/InfiniteScrollList";
import Source from "@/features/feed/components/source/Source";
import {useCallback, useState} from "react";
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";

function Sources() {
    const {refresh: refreshParam} = useLocalSearchParams();
    const [refresh, setRefresh] = useState(0);

    useFocusEffect(
        useCallback(() => {
            if (refreshParam) {
                setRefresh(i => i + 1);
                router.replace('/sources');
            }
        }, [refreshParam])
    );

    return (
        <SafeAreaView className="flex-1 relative">

            <InfiniteScrollList
                refresh={refresh}
                renderItem={({item}) => <Source source={item}/>}
                url="/api/source"
                params="sort=recent"
                noResultsMessage="Geen bronnen gevonden..."
            />

        </SafeAreaView>
    );
}

export default Sources;