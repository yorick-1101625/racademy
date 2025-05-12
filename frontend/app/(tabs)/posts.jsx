import {SafeAreaView} from 'react-native';
import PostList from "@/features/feed/components/post/PostList";

function Posts() {
    return (

        <SafeAreaView className="flex-1">

            <PostList/>

        </SafeAreaView>
    );
}

export default Posts;