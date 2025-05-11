import {SafeAreaView} from 'react-native';
import PostList from "@/features/feed/components/post/PostList";

function Posts() {
    return (

        <SafeAreaView className="flex-1 items-center bg-neutral-100">

            <PostList />

        </SafeAreaView>
    );
}

export default Posts;