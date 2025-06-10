import {withLayoutContext} from "expo-router";
import '@/global.css'
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

const {Navigator} = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

function TabsLayout() {
    return (
        <>
            <MaterialTopTabs id="1" screenOptions={{
                tabBarLabelStyle: {textTransform: 'capitalize', fontSize: 16},
                tabBarIndicatorStyle: {backgroundColor: '#3daad3'}
            }}
            >
                <MaterialTopTabs.Screen name="posts"/>
                <MaterialTopTabs.Screen name="sources" options={{title: 'bronnen'}}/>
            </MaterialTopTabs>
        </>
    );
}

export default TabsLayout;