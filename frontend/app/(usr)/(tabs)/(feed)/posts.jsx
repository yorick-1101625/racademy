import {SafeAreaView} from 'react-native';
import InfiniteScrollList from "@/components/InfiniteScrollList";
import Post from "@/features/feed/components/post/Post";

function Posts() {

    return (
        <SafeAreaView className="flex-1">

            <InfiniteScrollList
                renderItem={({item}) => <Post post={item}/>}
                url="/api/post"
                params="sort=recent"
                noResultsMessage="Geen posts gevonden..."
            />

        </SafeAreaView>
    );
}

export default Posts;