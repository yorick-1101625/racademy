import {Image, Pressable, Text, View} from 'react-native';

import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";
import formatRating from "@/features/feed/utils/formatRating";
import getRatingIcon from "@/features/feed/utils/getRatingIcon";
import {Ionicons} from "@expo/vector-icons";
import {useContext} from "react";
import {UserContext} from "@/contexts/UserContext";
import fatty from "@/utils/fatty";
import {showError, showSuccess} from "@/utils/toast";

function
SourceDetails({createdAt, schoolSubject, subject, rating, isBookmarked, handleBookmark, sourceUserId, sourceId}) {

    const { user } = useContext(UserContext);

    const userId = user.id;

    function handleDelete() {

        fatty(`/api/source/${sourceId}`, 'DELETE', {id: sourceId})
            .then(data => {
                if (data.success) {
                    showSuccess("Bron is verwijderd")
                } else if (!data.success) {
                    showError("Er ging iets mis")
                }
            });
    }

    return (
        <>
            <View>
                <Text className="text-xs text-gray-500 mt-2">{calculateTimeFromToday(createdAt)}</Text>
                <Text className="text-xs text-gray-500">{schoolSubject}: {subject}</Text>
            </View>

            <View className="flex-row items-center justify-between mt-4">
                <View className="flex-row">
                    <Pressable
                        onPress={handleBookmark}
                    >
                        <Ionicons
                            name={isBookmarked ? "bookmark" : "bookmark-outline"}
                            size={19}
                            color={isBookmarked ? "#3daad3" : "gray"}
                        />
                    </Pressable>
                    {
                        sourceUserId === userId ? <Ionicons name="trash-outline" size={19} color="gray" onPress={handleDelete}/> : null
                    }
                </View>
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