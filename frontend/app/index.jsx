import {SafeAreaView} from 'react-native';


import PostList from "../features/feed/components/PostList";



function Home() {
    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-neutral-100">

            <PostList />

        </SafeAreaView>
    );
}

export default Home;