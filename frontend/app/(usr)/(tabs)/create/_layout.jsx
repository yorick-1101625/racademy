import '@/global.css'
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {withLayoutContext} from "expo-router";

const {Navigator} = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

function TabsLayout() {
    return (
        <>
            <MaterialTopTabs id="1" screenOptions={{
                    tabBarLabelStyle: { textTransform: 'capitalize', fontSize: 16 },
                    tabBarIndicatorStyle: { backgroundColor: '#3daad3' },
                    tabBarStyle: { zIndex: 99 }
                }}
            >
                <MaterialTopTabs.Screen name="post" />
                <MaterialTopTabs.Screen name="source" options={{ title: 'bron' }} />
            </MaterialTopTabs>
        </>
    );
}

export default TabsLayout;