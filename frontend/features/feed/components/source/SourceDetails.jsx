import {Image, Pressable, Text, View} from 'react-native';

import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";
import formatRating from "@/features/feed/utils/formatRating";
import {Ionicons} from "@expo/vector-icons";
import BottomModal from "@/components/BottomModal";
import {useState} from "react";
import calculateAverageRating from "@/features/feed/utils/calculateAverageRating";

function SourceDetails({createdAt, schoolSubject, subject, ratings, isBookmarked, handleBookmark, isRated}) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userRating, setUserRating] = useState(null);
    const [_isRated, _setIsRated] = useState(isRated);

    const totalRatings = ratings.slice() || [];
    (userRating && _isRated) && totalRatings.push(userRating);
    const averageRating = calculateAverageRating(totalRatings);

    return (
        <>
            <View className="flex-row justify-between">
                <View>
                    <Text className="text-xs text-gray-500 mt-2">{calculateTimeFromToday(createdAt)}</Text>
                    <Text className="text-xs text-gray-500">{schoolSubject}: {subject}</Text>
                </View>

                <View className="flex-row items-center justify-between mt-2 pr-2 w-32">
                    <Pressable
                        className="flex-row items-center"
                        onPress={() => setIsModalVisible(true)}
                    >
                        <Ionicons name={_isRated ? 'star' : 'star-outline'} size={19} color={ _isRated ? '#ebc553' : 'gray'}/>
                        <Text className="ml-1">{isNaN(averageRating) ? '-' : formatRating(averageRating)}</Text>
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

            <BottomModal state={[isModalVisible, setIsModalVisible]}>
                <View className="flex-row p-5 mb-5 justify-center">
                {
                    [10,20,30,40,50].map(i => (
                        <Pressable
                            key={i}
                            className="mx-1"
                            onPress={() => setUserRating(i)}
                        >
                            <Ionicons name={ userRating >= i ? 'star' : 'star-outline'} color={ userRating >= i ? '#ebc553' : 'gray'} size={36} />
                        </Pressable>
                    ))
                }
                </View>


                <View className="flex-row justify-between space-x-3">
                    <Pressable
                        className="flex-1 py-3 bg-gray-200 rounded-md"
                        onPress={() => {
                            setUserRating(null);
                            _setIsRated(false);
                            setIsModalVisible(false);
                        //     TODO: Send fetch to delete rating
                        }}
                    >
                        <Text className="text-center text-black font-semibold">Verwijderen</Text>
                    </Pressable>

                    <Pressable
                        className="flex-1 py-3 bg-rac rounded-md"
                        onPress={() => {
                            // TODO: send fetch to create rating
                            if (userRating) {
                                _setIsRated(true);
                            }
                            setIsModalVisible(false);
                        }}
                    >
                        <Text className="text-center text-white font-semibold">Toepassen</Text>
                    </Pressable>
                </View>
            </BottomModal>
        </>
    );
}

export default SourceDetails;