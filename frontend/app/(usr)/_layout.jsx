import {Link, Slot, Stack} from "expo-router";
import CurrentUserProfilePicture from "@/components/CurrentUserProfilePicture";
import {Image} from "react-native";
import Logo from "@/assets/logo.png";
import {Ionicons} from "@expo/vector-icons";
import UserOnly from "@/components/UserOnly";

function _Layout() {
    return (
        <UserOnly>
            <Stack screenOptions={{
                headerShadowVisible: false,
                headerTitleAlign: 'center',
            }}>
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
                                {/*color property not working properly?*/}
                                <Ionicons name="settings-outline" size={26} className="text-rac" />
                            </Link>
                        )
                    }}
                />

                <Stack.Screen
                    name="posts"
                    options={{
                        headerTitle: () => ""
                    }}
                />
                <Stack.Screen
                    name="profile"
                    options={{
                        headerTitle: () => ""
                    }}
                />
                <Stack.Screen
                    name="sources"
                    options={{
                        headerTitle: () => ""
                    }}
                />
                <Stack.Screen
                    name="users"
                    options={{
                        headerTitle: () => ""
                    }}
                />
                <Stack.Screen
                    name="change-password"
                    options={{
                        headerTitle: () => ""
                    }}
                />
            </Stack>
        </UserOnly>
    );
}

export default _Layout;