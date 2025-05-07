import {SafeAreaView} from 'react-native';

import Feed from "@/features/feed/components/Feed";

function Home() {



    return (
        <SafeAreaView className="flex-1 items-center bg-neutral-100">

            <Feed />

        </SafeAreaView>
    );
}

export default Home;