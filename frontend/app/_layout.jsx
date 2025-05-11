import {Link, Stack} from 'expo-router';
import Toast from "react-native-toast-message";
import {UserProvider} from "@/contexts/UserContext";
import {Image, View} from "react-native";
import useUser from "@/hooks/useUser";
import AntDesign from "@expo/vector-icons/AntDesign";
import Logo from "@/assets/logo.png"
import CurrentUserProfilePicture from "@/components/CurrentUserProfilePicture";

function RootLayout() {

    // const { user } = useUser();

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
                                    <CurrentUserProfilePicture className="w-8 h-8 rounded-full" />
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
                                    <AntDesign name="setting" size={32} />
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
