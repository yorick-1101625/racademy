import {Slot} from 'expo-router';
import Toast from "react-native-toast-message";
import {UserProvider} from "@/contexts/UserContext";

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
