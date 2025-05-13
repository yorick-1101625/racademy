import {ActivityIndicator, FlatList, Text} from 'react-native';
import Post from "./Post";
import useFetch from "@/hooks/useFetch";

function PostList() {

    const {data: posts, isPending, error} = useFetch('http://127.0.0.1:5000/api/post/');

    return (
        <>
            { isPending && <ActivityIndicator />}
            { error && <Text>Error!</Text>}
            {
                posts && <FlatList
                    data={ posts }
                    renderItem={({item}) => <Post post={item}/>}
                    keyExtractor={post => post.id}
                />
            }
        </>
    );
}

export default PostList;