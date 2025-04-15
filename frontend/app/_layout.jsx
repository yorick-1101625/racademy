import {Slot} from "expo-router";

import '../global.css'
import {StatusBar} from "expo-status-bar";

function RootLayout() {
    return (
        <>
            <StatusBar hidden={true}/>
            <Slot />
        </>
    );
}

export default RootLayout;