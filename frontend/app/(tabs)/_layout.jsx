import '@/global.css'
import UserOnly from "@/components/UserOnly";
import {Tabs} from "expo-router";
import {Feather, Ionicons} from "@expo/vector-icons";

function TabsLayout() {
    return (
        <UserOnly>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#3daad3'
                }}
            >
                <Tabs.Screen
                    name="(feed)"
                    options={{
                        title: '',
                        tabBarIcon: ({color}) => <Ionicons size={24} name="home-outline" color={color}/>,
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