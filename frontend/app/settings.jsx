import {Link, useRouter} from "expo-router";
import {Pressable, Text} from "react-native";
import useUser from "@/hooks/useUser";

function Profile() {

    const { logout } = useUser()
    const router = useRouter();

    function handleLogout() {
        logout().then(() => router.replace('/'))
    }

    return (
        <>
            <Link href="/posts">
            <h1>Settings hier dark/light mode idk</h1>
            </Link>

            <Pressable
                onPress={handleLogout}
            >
                <Text>Uitloggen</Text>
            </Pressable>

            <Text>Verwijder Account...</Text>
        </>
    );
}

export default Profile;