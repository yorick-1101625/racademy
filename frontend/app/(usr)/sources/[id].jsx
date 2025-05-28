import {ActivityIndicator, Text, View} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import useFetch from "@/hooks/useFetch";
import Source from "@/features/feed/components/source/Source";
import Error from "@/components/Error";



function SourceDetails() {

    const { id } = useLocalSearchParams();

    const {data: source, isPending, error} = useFetch(`/api/source/${id}`);

    if (isPending) return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#3daad3"/>
        </View>
    );

    if (error) return (
        <Error />
    );

    return(
        <View>
            <Source source={source}/>
        </View>
    );
}

export default SourceDetails;