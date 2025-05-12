import useUser from "@/hooks/useUser";
import {useRouter} from "expo-router";
import {useEffect} from "react";
import {ActivityIndicator} from "react-native";

function UserOnly({ children }) {

    // Redirect if user is not logged in

    const { user, authChecked } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (authChecked && user === null) {
            router.replace('/');
        }
    }, [user, authChecked]);

    if (!authChecked || !user) {
        return <ActivityIndicator />
    }

    return children;
}

export default UserOnly;