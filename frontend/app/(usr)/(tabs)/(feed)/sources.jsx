import {SafeAreaView} from 'react-native'
import InfiniteScrollList from "@/components/InfiniteScrollList";
import Source from "@/features/feed/components/source/Source";

function Sources() {

    return (
        <SafeAreaView className="flex-1 relative">

            <InfiniteScrollList
                renderItem={({item}) => <Source source={item}/>}
                url="/api/source"
                params="sort=recent"
                noResultsMessage="Geen bronnen gevonden..."
            />

        </SafeAreaView>
    );
}

export default Sources;