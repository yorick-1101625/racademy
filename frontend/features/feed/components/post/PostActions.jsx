import {useRef, useState} from "react";
import {Image, Pressable, Text, View} from 'react-native';

// Icons #TODO Remove these icons?
import ChatBubbleIcon from "@/assets/icons/comment/chat-bubble.png";
import HeartIconRed from "@/assets/icons/like/heart-red.png";
import HeartIconBlack from "@/assets/icons/like/heart-black.png";

import {Feather} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userId = 1; // TODO: change to use session variables

function PostActions({numberOfComments, numberOfLikes, likedByCurrentUser, postId, isBookmarked, handleBookmark}) {

    const [isLiked, setIsLiked] = useState(likedByCurrentUser);
    const numberOfLikesRef = useRef(numberOfLikes);

    function handleLike() {
        AsyncStorage.getItem('token')
            .then(token => {
                return fetch(`http://127.0.0.1:5000/api/user/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({liked_post: postId})
                });
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
        <View className="flex-row justify-between mt-4 px-2">
            <Pressable
                className="flex-row items-center"
            >
                <Feather name="message-square" size={16} color="gray"/>
                <Text className="ml-1 text-sm text-gray-600">
                    {numberOfComments}
                </Text>
            </Pressable>

            <Pressable
                onPress={handleLike}
                className="flex-row items-center"
            >
                <Feather
                    name="heart"
                    size={16}
                    className={isLiked ? "text-rac" : "black"}
                />
                <Text className="ml-1 text-sm text-gray-600">
                    {numberOfLikesRef.current}
                </Text>
            </Pressable>

            <Pressable
                onPress={handleBookmark}
                className="flex-row items-center"
            >
                <Feather
                    name="bookmark"
                    size={16}
                    className={isBookmarked ? "text-rac" : "black"}
                />
            </Pressable>
        </View>
    );
}

export default PostActions;