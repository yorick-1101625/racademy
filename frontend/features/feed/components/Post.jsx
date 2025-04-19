import {Image, Text, View} from 'react-native';
import Kebab from "../../../assets/menu/kebab.png";
import NotLiked from "../../../assets/like/heart-white.png";
import Liked from "../../../assets/like/heart-red.png";

import calculateTimeFromToday from "../utils/calculateTimeFromToday";

function Post({ post }) {
    return (
        <View className="w-11/12">
            {/* Author */}
            <View className="flex-row items-center">
                <Image source={ post.profilePicture } className="w-12 h-12 bg-neutral-300 rounded-full hover:cursor-pointer"/>
                <Text className="ml-3 text-lg hover:cursor-pointer hover:underline">{ post.username }</Text>
            </View>

            <View className="bg-neutral-200 mt-3 p-5 shadow-md shadow-neutral-200 rounded-lg relative hover:cursor-pointer">
                <View className="absolute top-4 right-4 h-6 w-6 hover:rotate-90 z-10 duration-150 hover:duration-75">
                    <Image source={Kebab} />
                </View>

                {/* Post */}
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
                        <Text className="mr-1 text-neutral-700">{ post.numberOfLikes }</Text>
                        <Image source={
                            post.likedByCurrentUser
                            ? Liked
                            : NotLiked
                        } />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Post;