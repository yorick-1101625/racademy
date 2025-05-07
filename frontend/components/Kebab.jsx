import {useState} from "react";
import {Image, Pressable, View} from 'react-native';
import KebabIcon from "@/assets/icons/menu/kebab.png";

function Kebab({ children }) {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <View className="absolute top-4 right-4 z-10 items-end">
            <Pressable
                className={`h-7 w-7 items-center justify-center z-20 duration-150 rounded-full hover:border active:border border-neutral-300 ${ isVisible && '-rotate-90 border' }`}
                onPress={() => setIsVisible(i => !i)}
            >
                <Image source={KebabIcon} />
            </Pressable>

            <View className={`bg-neutral-100 p-3 rounded-sm shadow-lg shadow-neutral-300 ${ isVisible || 'hidden' }`}>

                { children }

            </View>
        </View>
    );
}

export default Kebab;