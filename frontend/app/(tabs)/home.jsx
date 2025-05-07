import {SafeAreaView} from 'react-native'

import Feed from "@/features/feed/components/Feed";
import {UserContext, UserProvider} from "@/contexts/UserContext";
import {useContext} from "react";
import useUser from "@/hooks/useUser";

function Home() {

    const {user} = useUser();
    console.log(user);

    return (
        <SafeAreaView className="flex-1 items-center bg-neutral-100">

            <Feed />

        </SafeAreaView>
    );
}

export default Home;