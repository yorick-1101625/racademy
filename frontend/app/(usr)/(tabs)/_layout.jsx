import '@/global.css'
import {Tabs} from "expo-router";
import {Feather, Ionicons} from "@expo/vector-icons";
import {View} from "react-native";

function TabsLayout() {
    return (
        <>
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
                        tabBarIcon: ({color}) => <View><Feather size={21.5} name="plus-circle" color={color}/></View>,
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
        </>
    );
}

export default TabsLayout;