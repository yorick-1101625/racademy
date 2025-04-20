import {Image, Pressable, Text, View} from 'react-native';
import {useState} from "react";

import KebabIcon from "../../../../assets/menu/kebab.png";
import BookmarkAdd from "../../../../assets/bookmark/bookmark-add.png";
import BookmarkAdded from "../../../../assets/bookmark/bookmark-added.png";

function PostMenu(props) {
    const [isVisible, setIsVisible] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(props.isBookmarked);

    function handleBookmark() {

        setIsBookmarked(i => !i);
    }

    return (
        <View className="absolute top-4 right-4 z-10 items-end">
            <Pressable
                className={`h-7 w-7 items-center justify-center z-20 duration-150 pop-button ${ isVisible && '-rotate-90' }`}
                onPress={() => setIsVisible(i => !i)}
            >
                <Image source={KebabIcon} />
            </Pressable>

            <View className={`bg-neutral-100 p-3 rounded-sm shadow-lg shadow-neutral-300 ${ isVisible || 'hidden' }`}>

                <Pressable
                    className="flex-row rounded-md border border-neutral-300 p-2 items-center hover:bg-neutral-200 transition-colors"
                    onPress={handleBookmark}
                >
                    <Text className="mr-3">{
                        isBookmarked
                        ? "Favoriet toegevoegd"
                        : "Favoriet toevoegen"
                    }</Text>
                    <Image source={
                        isBookmarked
                        ? BookmarkAdded
                        : BookmarkAdd
                    } />
                </Pressable>

            </View>
        </View>
    );
}

export default PostMenu;