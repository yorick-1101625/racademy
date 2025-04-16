import {Slot} from "expo-router";
import {StatusBar} from "expo-status-bar";
import '../global.css'

function RootLayout() {
    return (
        <>
            <StatusBar hidden={true}/>
            <Slot />
        </>
    );
}

export default RootLayout;