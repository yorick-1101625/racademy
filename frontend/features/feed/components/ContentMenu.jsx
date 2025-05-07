import {Image, Pressable, Text} from 'react-native';
import BookmarkAdd from "@/assets/icons/bookmark/bookmark-add.png";
import BookmarkAdded from "@/assets/icons/bookmark/bookmark-added.png";
import Kebab from "@/components/Kebab";

function ContentMenu({ isBookmarked, handleBookmark }) {

    return (
        <Kebab>
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
        </Kebab>
    );
}

export default ContentMenu;