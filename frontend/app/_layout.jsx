import {Link, Stack} from 'expo-router';
import Toast from "react-native-toast-message";
import {UserProvider} from "@/contexts/UserContext";
import {Image} from "react-native";
import Logo from "@/assets/logo.png"
import CurrentUserProfilePicture from "@/components/CurrentUserProfilePicture";
import {Feather, Ionicons} from "@expo/vector-icons";

function RootLayout() {

    return (
        <>
            <UserProvider>
                <Stack screenOptions={{
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                }}>
                    <Stack.Screen
                        name="index"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerLeftContainerStyle: {paddingLeft: 20},
                            headerLeft: () => (
                                <Link href="/profile">
                                    <CurrentUserProfilePicture className="w-9 h-9 rounded-full" />
                                </Link>
                            ),

                            headerTitle: () => (
                                <Image
                                    source={Logo}
                                    resizeMode="contain"
                                    style={{width: 64, height: 64}}
                                    alt="logo"
                                />
                            ),

                            headerRightContainerStyle: {paddingRight: 20},
                            headerRight: () => (
                                <Link href="/settings">
                                    <Ionicons name="settings-outline" size={26} className="text-rac" />
                                </Link>
                            )
                        }}
                    />
                </Stack>
            </UserProvider>
            <Toast />
        </>
    );
}

export default RootLayout;
