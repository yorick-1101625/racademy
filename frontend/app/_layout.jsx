import {Stack} from 'expo-router';
import Toast from "react-native-toast-message";
import {UserProvider} from "@/contexts/UserContext";

function RootLayout() {
    
    return (
        <>
            <UserProvider>
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
                            headerLeft: () => {
                                // <Image
                                //     source={}
                                // />
                            }
                        }}
                    />
                </Stack>
            </UserProvider>
            <Toast />
        </>
    );
}

export default RootLayout;
