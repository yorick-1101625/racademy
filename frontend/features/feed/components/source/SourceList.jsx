import {ActivityIndicator, FlatList, Text} from 'react-native';
import Source from './Source.jsx';
import useFetch from "@/hooks/useFetch";

function SourceList() {

    const {data: sources, isPending, error} = useFetch(`/api/source/`);

    return (
        <>
            { isPending && <ActivityIndicator />}
            { error && <Text>Error!</Text>}
            {
                sources && <FlatList
                    data={ sources }
                    renderItem={({item}) => <Source source={item}/>}
                    keyExtractor={source => source.id}
                />
            }
        </>
    );
}

export default SourceList;