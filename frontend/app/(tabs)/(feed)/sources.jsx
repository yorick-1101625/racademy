import {SafeAreaView} from 'react-native'
import SourceList from "@/features/feed/components/source/SourceList";

function Sources() {

    return (
        <SafeAreaView className="flex-1 relative">

            <SourceList />

        </SafeAreaView>
    );
}

export default Sources;