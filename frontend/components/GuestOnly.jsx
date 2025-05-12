import useUser from "@/hooks/useUser";
import {useRouter} from "expo-router";
import {useEffect} from "react";

function GuestOnly({ children }) {

    // Redirect if user is logged in

    const { user, authChecked } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (authChecked && user !== null) {
            router.replace('/posts');
        }
    }, [user, authChecked]);

    return children;
}

export default GuestOnly;