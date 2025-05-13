import {useRef, useState} from "react";
import {Pressable, Text, View} from 'react-native';

import {Feather} from "@expo/vector-icons";

import fatty from "@/utils/fatty";

function PostActions({numberOfComments, numberOfLikes, likedByCurrentUser, postId, isBookmarked, handleBookmark}) {

    const [isLiked, setIsLiked] = useState(likedByCurrentUser);
    const numberOfLikesRef = useRef(numberOfLikes);

    function handleLike() {
        fatty('/api/user/', 'PATCH', {liked_post: postId})
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