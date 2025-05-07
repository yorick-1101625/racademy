import {Stack} from 'expo-router';
import Toast from "react-native-toast-message";

function RootLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
            <Toast />
        </>
    );
}

export default RootLayout;
