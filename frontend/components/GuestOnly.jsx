import useUser from "@/hooks/useUser";
import {useRouter} from "expo-router";
import {useEffect} from "react";
import {ActivityIndicator, View} from "react-native";

function GuestOnly({ children }) {

    // Redirect if user is logged in

    const { user, authChecked } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (authChecked && user !== null) {
            router.replace('/posts');
        }
    }, [user, authChecked]);

    if (!authChecked) {
        return <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#3daad3"/>
                </View>;
    }

    return children;
}

export default GuestOnly;