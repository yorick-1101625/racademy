import {Image, Pressable, Text, View} from 'react-native';

import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";
import formatRating from "@/features/feed/utils/formatRating";
import getRatingIcon from "@/features/feed/utils/getRatingIcon";
import {Feather, Ionicons} from "@expo/vector-icons";

function SourceDetails({createdAt, schoolSubject, subject, rating, isBookmarked, handleBookmark}) {

    return (
        <>
            <View>
                <Text className="text-xs text-gray-500 mt-2">{calculateTimeFromToday(createdAt)}</Text>
                <Text className="text-xs text-gray-500">{schoolSubject}: {subject}</Text>
            </View>

            <View className="flex-row items-center justify-between mt-4">
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
                {
                    isNaN(rating) ||
                        <View className="flex-row items-center">
                            <Text className="mr-1">{formatRating(rating)}</Text>
                            <Image source={getRatingIcon(rating)}/>
                        </View>
                }
            </View>
        </>
    );
}

export default SourceDetails;