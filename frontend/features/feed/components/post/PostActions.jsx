import {useRef, useState} from "react";
import {Image, Pressable, Text, View} from 'react-native';

// Icons
import ChatBubbleIcon from "@/assets/icons/comment/chat-bubble.png";
import HeartIconRed from "@/assets/icons/like/heart-red.png";
import HeartIconBlack from "@/assets/icons/like/heart-black.png";

function PostActions({ numberOfComments, numberOfLikes, likedByCurrentUser }) {

    const [isLiked, setIsLiked] = useState(likedByCurrentUser);
    const numberOfLikesRef = useRef(numberOfLikes);

    function handleLike() {
        isLiked
        ? numberOfLikesRef.current--
        : numberOfLikesRef.current++

        setIsLiked(i => !i);
    }

    return (
        <View className="flex-row">
            <Pressable
                className="flex-row items-center"
            >
                <Text className="mr-1 text-neutral-700">{ numberOfComments }</Text>
                <Image
                    className="w-7 h-7 pop-button"
                    source={ ChatBubbleIcon }
                />
            </Pressable>

            <Pressable
                onPress={handleLike}
                className="flex-row items-center ml-3"
            >
                <Text className="mr-1 text-neutral-700">{ numberOfLikesRef.current }</Text>
                <Image
                    className="w-7 h-7 pop-button"
                    source={
                        isLiked
                        ? HeartIconRed
                        : HeartIconBlack
                    }
                />
            </Pressable>
        </View>
    );
}

export default PostActions;