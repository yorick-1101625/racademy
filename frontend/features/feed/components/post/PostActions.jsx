import {useContext, useRef, useState} from "react";
import {Pressable, Text, View} from 'react-native';

import {Ionicons} from "@expo/vector-icons";

import fatty from "@/utils/fatty";
import {UserContext} from "@/contexts/UserContext";
import {showError, showSuccess} from "@/utils/toast";
import BottomModal from "@/components/BottomModal";

function PostActions({
                         numberOfComments,
                         numberOfLikes,
                         likedByCurrentUser,
                         postId,
                         isBookmarked,
                         handleBookmark,
                         postUserId
                     }) {

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

    const {user} = useContext(UserContext);
    const userId = user.id;

    const [modalVisible, setModalVisible] = useState(false);


    function handleDelete() {

        fatty(`/api/post/${postId}`, 'DELETE', {id: postId})
            .then(data => {
                if (data.success) {
                    showSuccess("Post is verwijderd")
                } else if (!data.success) {
                    showError("Er ging iets mis")
                }
                setModalVisible(false);
            });
    }


    return (
        <>
            <View className="">
                <View className="flex-row justify-start mt-4 w-52">
                    <Pressable
                        className="flex-row items-center mr-8"
                    >
                        <Ionicons name="chatbubble-outline" size={19} color="gray"/>
                        <Text className="ml-1 text-sm text-gray-600">
                            {numberOfComments}
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={handleLike}
                        className="flex-row items-center mr-8"
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
                        className="flex-row items-center mr-8"
                    >
                        <Ionicons
                            name={isBookmarked ? "bookmark" : "bookmark-outline"}
                            size={19}
                            color={isBookmarked ? "#3daad3" : "gray"}
                        />
                    </Pressable>

                    <Pressable
                        onPress={handleDelete}
                        className="flex-row items-center mr-8"
                    >
                        {
                            postUserId === userId ?
                                <Ionicons name="trash-outline" size={19} color="gray"
                                          onPress={() => setModalVisible(true)}/> : null
                        }
                    </Pressable>
                </View>
            </View>

            <BottomModal state={[modalVisible, setModalVisible]}>
                <View className="items-center mb-4">
                    <Ionicons name="trash-bin" size={64} color="#EF4444"/>
                </View>

                <Text className="text-lg font-semibold mb-6 text-center text-black">
                    Weet je zeker dat je deze post wilt verwijderen?
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

export default PostActions;