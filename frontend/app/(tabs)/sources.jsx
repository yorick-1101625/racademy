import {SafeAreaView} from 'react-native'
import SourceList from "@/features/feed/components/source/SourceList";

function Sources() {

    return (
        <SafeAreaView className="flex-1 items-center bg-neutral-100">

            <SourceList />

        </SafeAreaView>
    );
}

export default Sources;