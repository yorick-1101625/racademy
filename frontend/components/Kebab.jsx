import {useState} from "react";
import {Pressable, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

function Kebab({ children }) {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <View className="absolute top-5 right-1 z-10 items-end">
            <Pressable
                className={`h-7 w-7 items-center justify-center z-20 duration-150 rounded-full hover:border active:border border-neutral-300 ${ isVisible && '-rotate-90 border' }`}
                onPress={() => setIsVisible(i => !i)}
            >
                <Ionicons name="ellipsis-vertical" color="gray" size={19} />
            </Pressable>

            <View className={`bg-white p-1 mt-1 rounded-md border border-gray-200 ${ isVisible || 'hidden' }`}>

                { children }

            </View>
        </View>
    );
}

export default Kebab;