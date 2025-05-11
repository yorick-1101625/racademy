import {Image, Pressable, Text, View} from 'react-native';

import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";
import formatRating from "@/features/feed/utils/formatRating";
import getRatingIcon from "@/features/feed/utils/getRatingIcon";
import {Feather} from "@expo/vector-icons";

function SourceDetails({createdAt, schoolSubject, subject, rating, isBookmarked, handleBookmark}) {

    return (
        <>
            <View>
                <Text className="text-xs text-gray-400 mt-2">{calculateTimeFromToday(createdAt)}</Text>
                <Text className="text-xs text-gray-400">{schoolSubject}: {subject}</Text>
            </View>

            {
                isNaN(rating) ||
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <Text className="mr-1">{formatRating(rating)}</Text>
                        <Image source={getRatingIcon(rating)}/>
                    </View>
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
            }
        </>
    );
}

export default SourceDetails;