import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import useFetch from "@/hooks/useFetch";
import Source from "@/features/feed/components/source/Source";
import Error from "@/components/Error";
import useUser from "@/hooks/useUser";
import {useState} from "react";
import {Feather, Ionicons} from "@expo/vector-icons";
import Kebab from "@/components/Kebab";



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

    return (
        <Source source={source}/>
    );
}

export default SourceDetails;