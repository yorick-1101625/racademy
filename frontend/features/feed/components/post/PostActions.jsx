import {useRef, useState} from "react";
import {Image, Pressable, Text, View} from 'react-native';

// Icons
import ChatBubbleIcon from "@/assets/icons/comment/chat-bubble.png";
import HeartIconRed from "@/assets/icons/like/heart-red.png";
import HeartIconBlack from "@/assets/icons/like/heart-black.png";

const userId = 1;

function PostActions({ numberOfComments, numberOfLikes, likedByCurrentUser, postId }) {

    const [isLiked, setIsLiked] = useState(likedByCurrentUser);
    const numberOfLikesRef = useRef(numberOfLikes);

    async function handleLike() {
        const body = isLiked ? {'unliked_post': postId} : {'liked_post': postId} // add user id, or access session from server

        fetch(`http://127.0.0.1:5000/api/user/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    isLiked
                        ? numberOfLikesRef.current--
                        : numberOfLikesRef.current++

                    setIsLiked(i => !i);
                }
            });
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