import {ActivityIndicator, FlatList} from 'react-native';
import Source from './Source.jsx';
import useFetch from "@/hooks/useFetch";
import NoResults from "@/features/search/components/NoResults";
import Error from "@/components/Error";

function SourceList({url = `/api/source/`}) {
    const {data: sources, isPending, error} = useFetch(url);

    if (isPending) return <ActivityIndicator color="#3daad3" />;
    if (error) return <Error />;

    if (!sources || sources.length === 0) {
        return (
            <NoResults message="Geen bronnen gevonden voor je zoekopdracht."/>
        );
    }

    return (
        <FlatList
            data={sources}
            renderItem={({item}) => <Source source={item}/>}
            keyExtractor={(source) => source.id.toString()}
        />
    );
}

export default SourceList;
