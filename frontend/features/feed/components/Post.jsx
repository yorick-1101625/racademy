import {Image, Pressable, Text, View} from 'react-native';

// Icons
import HeartIconBlack from "../../../assets/like/heart-black.png";
import HeartIconRed from "../../../assets/like/heart-red.png";
import ChatBubble from "../../../assets/comment/chat-bubble.png";

import calculateTimeFromToday from "../utils/calculateTimeFromToday";
import {useRef, useState} from "react";
import PostMenu from "./PostMenu";

function Post({ post }) {

    const [isLiked, setIsLiked] = useState(post.likedByCurrentUser);
    const numberOfLikesRef = useRef(post.numberOfLikes);

    function handleLike() {
        isLiked
        ? numberOfLikesRef.current--
        : numberOfLikesRef.current++

        setIsLiked(i => !i);
    }

    return (
        <View className="my-5">
            {/* Author */}
            <View className="flex-row items-center">
                <Image source={ post.profilePicture } className="w-12 h-12 bg-neutral-300 rounded-full cursor-pointer peer"/>
                <Text className="ml-3 text-lg cursor-pointer hover:underline peer-hover:underline">{ post.username }</Text>
            </View>

            <View className="bg-neutral-200 mt-3 p-5 hover:shadow-md hover:shadow-neutral-200 transition-shadow rounded-lg relative cursor-pointer">
                <PostMenu isBookmarked={post.bookmarkedByCurrentUser} />

                {/* Content */}
                <Text className="font-bold text-2xl">{ post.title }</Text>
                <Text className="mt-2 p-1 text-neutral-800">
                    { post.content }
                </Text>

                {/* Details */}
                <View className="mt-4 flex-row justify-between items-end">
                    <View>
                        <Text className="italic text-neutral-600">{ calculateTimeFromToday(post.createdAt) }</Text>
                        <Text className="italic text-neutral-600">{ post.tags.join(' ') }</Text>
                    </View>

                    <View className="flex-row">
                        <Pressable
                            className="flex-row items-center"
                        >
                            <Text className="mr-1 text-neutral-700">{ post.numberOfComments }</Text>
                            <Image
                                className="w-7 h-7 hover:scale-110 active:scale-90 duration-75"
                                source={ ChatBubble }
                            />
                        </Pressable>

                        <Pressable
                            onPress={handleLike}
                            className="flex-row items-center ml-3"
                        >
                            <Text className="mr-1 text-neutral-700">{ numberOfLikesRef.current }</Text>
                            <Image
                                className="w-7 h-7 hover:scale-110 active:scale-90 duration-75"
                                source={
                                    isLiked
                                    ? HeartIconRed
                                    : HeartIconBlack
                                }
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Post;