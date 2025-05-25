import {Image, Pressable, Text, View} from 'react-native';

import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";
import formatRating from "@/features/feed/utils/formatRating";
import getRatingIcon from "@/features/feed/utils/getRatingIcon";
import {Ionicons} from "@expo/vector-icons";
import {useContext, useState} from "react";
import {UserContext} from "@/contexts/UserContext";
import fatty from "@/utils/fatty";
import {showError, showSuccess} from "@/utils/toast";
import BottomModal from "@/components/BottomModal";

function
SourceDetails({createdAt, schoolSubject, subject, rating, isBookmarked, handleBookmark, sourceUserId, sourceId}) {

    const {user} = useContext(UserContext);
    const userId = user.id;

    const [modalVisible, setModalVisible] = useState(false);


    function handleDelete() {

        fatty(`/api/source/${sourceId}`, 'DELETE', {id: sourceId})
            .then(data => {
                if (data.success) {
                    showSuccess("Bron is verwijderd")
                } else if (!data.success) {
                    showError("Er ging iets mis")
                }
                setModalVisible(false);

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
                        sourceUserId === userId ?
                            <Ionicons name="trash-outline" size={19} color="gray" onPress={() => setModalVisible(true)}/> : null
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

             <BottomModal state={[modalVisible, setModalVisible]}>
                <View className="items-center mb-4">
                    <Ionicons name="trash-bin" size={64} color="#EF4444"/>
                </View>

                <Text className="text-lg font-semibold mb-6 text-center text-black">
                    Weet je zeker dat je deze bron wilt verwijderen?
                </Text>

                <View className="flex-row justify-between space-x-3">
                    <Pressable
                        onPress={() => setModalVisible(false)}
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