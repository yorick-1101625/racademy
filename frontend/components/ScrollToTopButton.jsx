import React, {useEffect, useState} from "react";
import {KeyboardAvoidingView, Pressable, Animated} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {Ionicons} from "@expo/vector-icons";

function ScrollToTopButton({onPress, scrollY}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const listener = scrollY.addListener(({value}) => {
            setIsVisible(value > 100);
        });

        return () => {
            if (listener) scrollY.removeListener(listener);
        };
    }, [scrollY]);

    if (!isVisible) return null;

    return (
        <KeyboardAvoidingView className="absolute bottom-4 right-4">
            <Pressable
                onPress={onPress}
                className="bg-rac w-14 h-14 items-center justify-center rounded-full active:opacity-80"
            >
                <Ionicons name="chevron-up" size={24} color="white" />
            </Pressable>
        </KeyboardAvoidingView>
    );
}

export default ScrollToTopButton;
