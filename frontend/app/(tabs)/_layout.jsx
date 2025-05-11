import {Tabs} from "expo-router";
import '@/global.css'
import colors from "tailwindcss/colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import UserOnly from "@/components/UserOnly";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

function TabsLayout() {
    return (
        <UserOnly>
            <MaterialTopTabs id="1" screenOptions={{
                    // tabBarActiveTintColor: '#3daad3',
                    tabBarLabelStyle: { textTransform: 'capitalize', fontSize: 16 },
                    tabBarIndicatorStyle: { backgroundColor: '#3daad3' }
                }}
            >
                <MaterialTopTabs.Screen name="posts" />
                <MaterialTopTabs.Screen name="sources" options={{ title: 'bronnen' }} />
            </MaterialTopTabs>
        </UserOnly>
    );
}

export default TabsLayout;