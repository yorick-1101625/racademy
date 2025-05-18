import {SafeAreaView} from 'react-native'
import SourceList from "@/features/content/components/source/SourceList";

function Sources() {

    return (
        <SafeAreaView className="flex-1 relative">

            <SourceList />

        </SafeAreaView>
    );
}

export default Sources;