import {useRef, useState} from "react";
import {Pressable, Text, View} from 'react-native';

import {Feather} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

function PostActions({numberOfComments, numberOfLikes, likedByCurrentUser, postId, isBookmarked, handleBookmark}) {

    const [isLiked, setIsLiked] = useState(likedByCurrentUser);
    const numberOfLikesRef = useRef(numberOfLikes);

    function handleLike() {
        AsyncStorage.getItem('token')
            .then(token => {
                return fetch(`${backendUrl}/api/user/`, {
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
                    className={isLiked ? "text-rac" : "text-gray-600"}
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
                    className={isBookmarked ? "text-rac" : "text-gray-600"}
                />
            </Pressable>
        </View>
    );
}

export default PostActions;