import {Image, Pressable, Text, View} from 'react-native';

import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";
import formatRating from "@/features/feed/utils/formatRating";
import {Ionicons} from "@expo/vector-icons";
import BottomModal from "@/components/BottomModal";
import {useState} from "react";
import calculateAverageRating from "@/features/feed/utils/calculateAverageRating";
import fatty from "@/utils/fatty";
import {showError, showSuccess} from "@/utils/toast";
import useUser from "@/hooks/useUser";

function SourceDetails({sourceId, createdAt, schoolSubject, subject, ratings, isBookmarked, handleBookmark, currentRating, sourceUserId}) {

    const {user} = useUser();

    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [userRating, setUserRating] = useState(currentRating);
    const [selectedRating, setSelectedRating] = useState(currentRating);

    function handleRating(value) {

        fatty('/api/user/', "PATCH", {
                "rated_source": sourceId,
                "rating": value
            })
            .then(data => {
                if (data.success) {
                    setUserRating(value);
                }
                else {
                    console.error(data.message);
                    showError("Kon beoordeling niet aanpassen.");
                }
            })
    }

    const totalRatings = ratings.slice() || [];
    (userRating && !currentRating) && totalRatings.push(userRating);
    const averageRating = calculateAverageRating(totalRatings);


    function handleDelete() {

        fatty(`/api/source/${sourceId}`, 'DELETE', {id: sourceId})
            .then(data => {
                if (data.success) {
                    showSuccess("Bron is verwijderd")
                } else if (!data.success) {
                    showError("Er ging iets mis")
                }
                setDeleteModalVisible(false);

            });
    }

    return (
        <>
            <View className="flex-row justify-between">
                <View>
                    <Text className="text-xs text-gray-500 mt-2">{calculateTimeFromToday(createdAt)}</Text>
                    <Text className="text-xs text-gray-500">{schoolSubject}: {subject}</Text>
                </View>

                <View className="flex-row items-center justify-end mt-2 pr-2">
                    {
                        sourceUserId === user.id
                            ?   <Ionicons
                                    name="trash-outline" size={19} color="gray"
                                    onPress={() => setDeleteModalVisible(true)}
                                />
                            :   null
                    }
                    <Pressable
                        className="flex-row items-center ml-8"
                        onPress={() => setRatingModalVisible(true)}
                    >
                        <Ionicons name={userRating ? 'star' : 'star-outline'} size={19} color={ userRating ? '#ebc553' : 'gray'}/>
                        <Text className="ml-1">{isNaN(averageRating) ? '-' : formatRating(averageRating)}</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleBookmark}
                        className="flex-row items-center ml-8"
                    >
                        <Ionicons
                            name={isBookmarked ? "bookmark" : "bookmark-outline"}
                            size={19}
                            color={isBookmarked ? "#3daad3" : "gray"}
                        />
                    </Pressable>
                </View>
            </View>

            {/* Rating Modal */}
            <BottomModal state={[ratingModalVisible, setRatingModalVisible]}>
                <View className="flex-row p-5 mb-5 justify-center">
                {
                    [10,20,30,40,50].map(i => (
                        <Pressable
                            key={i}
                            className="mx-1"
                            onPress={() => setSelectedRating(i)}
                        >
                            <Ionicons name={ selectedRating >= i ? 'star' : 'star-outline'} color={ selectedRating >= i ? '#ebc553' : 'gray'} size={36} />
                        </Pressable>
                    ))
                }
                </View>


                <View className="flex-row justify-between space-x-3">
                    <Pressable
                        className="flex-1 py-3 bg-gray-200 rounded-md"
                        onPress={() => {
                            setSelectedRating(null);
                        }}
                    >
                        <Text className="text-center text-black font-semibold">Verwijderen</Text>
                    </Pressable>

                    <Pressable
                        className="flex-1 py-3 bg-rac rounded-md"
                        onPress={() => {
                            handleRating(selectedRating); // Create rating
                            setRatingModalVisible(false);
                        }}
                    >
                        <Text className="text-center text-white font-semibold">Toepassen</Text>
                    </Pressable>
                </View>
            </BottomModal>


             {/* Delete Modal */}
             <BottomModal state={[deleteModalVisible, setDeleteModalVisible]}>
                <View className="items-center mb-4">
                    <Ionicons name="trash-bin" size={64} color="#EF4444"/>
                </View>

                <Text className="text-lg font-semibold mb-6 text-center text-black">
                    Weet je zeker dat je deze bron wilt verwijderen?
                </Text>

                <View className="flex-row justify-between space-x-3">
                    <Pressable
                        onPress={() => setDeleteModalVisible(false)}
                        className="flex-1 py-3 bg-gray-200 rounded-md"
                    >
                        <Text className="text-center text-black font-semibold">Annuleren</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleDelete}
                        className="flex-1 py-3 bg-red-600 rounded-md"
                    >
                        <Text className="text-center text-white font-semibold">Verwijderen</Text>
                    </Pressable>
                </View>
            </BottomModal>
        </>
    );
}

export default SourceDetails;