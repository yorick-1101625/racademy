import {Slot} from 'expo-router';
import Toast from "react-native-toast-message";
import {UserProvider} from "@/contexts/UserContext";
import {SafeAreaProvider} from "react-native-safe-area-context";

function RootLayout() {

    return (
        <>
            <SafeAreaProvider>
                <UserProvider>
                    <Slot/>
                </UserProvider>
                <Toast/>
            </SafeAreaProvider>
        </>
    );
}

export default RootLayout;
