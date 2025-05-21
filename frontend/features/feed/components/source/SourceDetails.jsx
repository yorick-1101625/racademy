import {Image, Pressable, Text, View} from 'react-native';

import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";
import formatRating from "@/features/feed/utils/formatRating";
import {Ionicons} from "@expo/vector-icons";

function SourceDetails({createdAt, schoolSubject, subject, rating, isBookmarked, handleBookmark, isRated}) {

    return (
        <View className="flex-row justify-between">
            <View>
                <Text className="text-xs text-gray-500 mt-2">{calculateTimeFromToday(createdAt)}</Text>
                <Text className="text-xs text-gray-500">{schoolSubject}: {subject}</Text>
            </View>

            <View className="flex-row items-center justify-between mt-2 pr-2 w-32">
                <Pressable
                    className="flex-row items-center"
                >
                    <Ionicons name={isRated ? 'star' : 'star-outline'} size={19} color={ isRated ? '#ebc553' : 'gray'}/>
                    <Text className="ml-1">{isNaN(rating) ? '-' : formatRating(rating)}</Text>
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

export default SourceDetails;