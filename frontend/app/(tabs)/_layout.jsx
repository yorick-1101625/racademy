import '@/global.css'
import colors from "tailwindcss/colors";
import UserOnly from "@/components/UserOnly";
import {Tabs} from "expo-router";
import {Feather} from "@expo/vector-icons";

function TabsLayout() {
    return (
        <UserOnly>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: colors.rac
                }}
            >
                <Tabs.Screen
                    name="(feed)"
                    options={{
                        title: '',
                        tabBarIcon: ({color}) => <Feather size={21.5} name="home" color={color}/>,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: '',
                        tabBarIcon: ({color}) => <Feather size={21.5} name="plus-circle" color={color}/>,
                        headerShown: false,
                    }}
                />
                 <Tabs.Screen
                    name="search"
                    options={{
                        title: '',
                        tabBarIcon: ({color}) => <Feather size={21.5} name="search" color={color}/>,
                        headerShown: false,
                    }}
                />
            </Tabs>
        </UserOnly>
    );
}

export default TabsLayout;