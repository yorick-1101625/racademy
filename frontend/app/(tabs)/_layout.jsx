import {Tabs} from "expo-router";
import '@/global.css'
import colors from "tailwindcss/colors";
import AntDesign from '@expo/vector-icons/AntDesign';

function TabsLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: colors.rac
                }}
            >
                <Tabs.Screen
                    name="(feed)"
                    options={{
                        title: '',
                        tabBarIcon: ({color}) => <AntDesign size={28} name="home" color={color}/>,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: '',
                        tabBarIcon: ({color}) => <AntDesign size={28} name="user" color={color}/>,
                        headerShown: false,
                    }}
                />
            </Tabs>
        </>
    );
}

export default TabsLayout;