import {Link, Slot, Stack} from 'expo-router';
import Toast from "react-native-toast-message";
import {UserProvider} from "@/contexts/UserContext";
import {Image} from "react-native";
import Logo from "@/assets/logo.png"
import CurrentUserProfilePicture from "@/components/CurrentUserProfilePicture";
import {Ionicons} from "@expo/vector-icons";

function RootLayout() {

    return (
        <>
            <UserProvider>
                <Slot/>
            </UserProvider>
            <Toast />
        </>
    );
}

export default RootLayout;
