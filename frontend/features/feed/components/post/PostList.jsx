import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import Post from "./Post";
import useFetch from "@/hooks/useFetch";
import NoResults from "@/features/search/components/NoResults";

function PostList({url = `/api/post/`}) {

    const {data: posts, isPending, error} = useFetch(url);

    if (isPending) return <ActivityIndicator/>;
    if (error) return <Text>Error!</Text>;

    if (!posts || posts.length === 0) {
        return (
            <NoResults message="Geen posts gevonden voor je zoekopdracht."/>
        );
    }

    return (<FlatList
            data={posts}
            renderItem={({item}) => <Post post={item}/>}
            keyExtractor={(post) => post.id.toString()}
        />);
}

export default PostList;