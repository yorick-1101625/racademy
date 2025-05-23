import {ActivityIndicator, FlatList, Pressable, View} from 'react-native';
import Error from "@/components/Error";
import CompactSource from "@/features/create/post/CompactSource";
import NoResults from "@/features/search/components/NoResults";
import useFetch from "@/hooks/useFetch";

function CompactSourceSelector({ query, setSource, selectedSource }) {

    const { data: sources, isPending, error } = useFetch(`/api/source?search=${encodeURIComponent(query)}&sort=recent`);

    if (isPending) return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#3daad3"/>
        </View>
    );

    if (error) return <Error />;

    if (!sources || sources.length === 0) {
        return (
            <NoResults message="Geen bronnen gevonden voor je zoekopdracht."/>
        );
    }

    return (
        <FlatList
            className="flex-1"
            data={sources}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
                <Pressable
                    className={`transition-transform duration-150 ${item.id === selectedSource?.id ? 'translate-x-3 border-b border-rac' : 'hover:translate-x-1' } `}
                    onPress={() => {
                        if (selectedSource?.id === item.id) {
                            setSource(null);
                        }
                        else {
                            setSource(item);
                        }
                    }}
                >
                    <CompactSource title={item.title} username={item.user.username}/>
                </Pressable>
            }
        />
    );
}

export default CompactSourceSelector;