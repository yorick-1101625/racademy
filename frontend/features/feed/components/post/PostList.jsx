import {ActivityIndicator, FlatList} from 'react-native';
import Post from "./Post";
import useFetch from "@/hooks/useFetch";
import NoResults from "@/features/search/components/NoResults";
import Error from "@/components/Error"

function PostList({url = `/api/post/`}) {

    const {data: posts, isPending, error} = useFetch(url);

    if (isPending) return <ActivityIndicator color="#3daad3" />;
    if (error) return <Error />;

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