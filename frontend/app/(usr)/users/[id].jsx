
import { useLocalSearchParams } from 'expo-router';
import {ActivityIndicator, SafeAreaView, View} from "react-native";
import UserProfile from "@/features/users/UserProfile";
import useFetch from "@/hooks/useFetch";
import Error from "@/components/Error";

export default function DynamicProfile() {
    const { id } = useLocalSearchParams();


    const {data: user, isPending, error} = useFetch(`/api/user/${id}`);

    if (isPending) return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#3daad3"/>
        </View>
    );

    if (error) return <Error title="Kon gebruiker niet vinden." />

    return (
        <SafeAreaView className="flex-1">
            <UserProfile user={user} />
        </SafeAreaView>
    );
}