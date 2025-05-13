import '@/global.css'
import colors from "tailwindcss/colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import UserOnly from "@/components/UserOnly";

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
        </UserOnly>
    );
}

export default TabsLayout;