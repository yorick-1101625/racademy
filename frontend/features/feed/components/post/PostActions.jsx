import {useRef, useState} from "react";
import {Pressable, Text, View} from 'react-native';

import {Feather, Ionicons} from "@expo/vector-icons";

import fatty from "@/utils/fatty";
import AntDesign from "@expo/vector-icons/AntDesign";

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
        <View className="">
            <View className="flex-row justify-between mt-4 px-2 w-52">
                <Pressable
                    className="flex-row items-center"
                >
                    <Ionicons name="chatbubble-outline" size={19} color="gray"/>
                    <Text className="ml-1 text-sm text-gray-600">
                        {numberOfComments}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={handleLike}
                    className="flex-row items-center"
                >
                    <Ionicons
                        name={isLiked ? "heart" : "heart-outline"}
                        size={19}
                        color={isLiked ? "red" : "gray"}
                    />
                    <Text className="ml-1 text-sm text-gray-600">
                        {numberOfLikesRef.current}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={handleBookmark}
                    className="flex-row items-center"
                >
                    <Ionicons
                        name={isBookmarked ? "bookmark" : "bookmark-outline"}
                        size={19}
                        color={isBookmarked ? "#3daad3" : "gray"}
                    />
                </Pressable>
            </View>
        </View>
    );
}

export default PostActions;