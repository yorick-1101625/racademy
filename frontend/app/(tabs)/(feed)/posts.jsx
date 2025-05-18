import {SafeAreaView} from 'react-native';
import PostList from "@/features/content/components/post/PostList";

function Posts() {
    return (

        <SafeAreaView className="flex-1">

            <PostList/>

        </SafeAreaView>
    );
}

export default Posts;