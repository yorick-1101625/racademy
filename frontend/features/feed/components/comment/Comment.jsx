import {View, Text, Image, Pressable} from "react-native";
import {BASE_URL} from "@/utils/url";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import BottomModal from "@/components/BottomModal";
import {Link, router} from "expo-router";
import Kebab from "@/components/Kebab";
import fatty from "@/utils/fatty";
import {showError, showSuccess} from "@/utils/toast";
import useUser from "@/hooks/useUser";

function Comment({comment, post_id}) {
    const [isVisible, setIsVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const {user} = useUser();

    function handleDelete() {

        fatty(`/api/comment/${comment.id}`, 'DELETE', {id: comment.id})
            .then(data => {
                if (data.success) {
                    showSuccess("Comment is verwijderd")
                    router.push(`/posts/${post_id}?refresh=1`);
                } else if (!data.success) {
                    showError("Er ging iets mis")
                }
                setDeleteModalVisible(false);
            });
    }

    return (
        <View className="flex-row p-4 border-t border-gray-200 bg-white">
            <View className="mr-3">
                <View className="items-center justify-center">
                    <Link href={`/users/${comment.user.id}`}>
                        <Image
                            source={{uri: `${BASE_URL}${comment.user.profile_picture}`}}
                            className="w-10 h-10 rounded-full"
                        />
                    </Link>
                </View>
            </View>

            <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                    <Link href={`/users/${comment.user.id}`}>
                        <View>
                            <Text className="font-bold text-gray-900 mr-2">
                                {comment.user.username}
                            </Text>
                            <Text className="text-gray-500 text-xs">
                                {comment.user.email}
                            </Text>
                        </View>
                    </Link>

                </View>

                <Text className="text-gray-900 mb-1">
                    {comment.content}
                </Text>
            </View>

            {
                comment.user.id === user.id
                    ? <Kebab>
                        <Pressable
                            className="flex-row rounded-md p-3 items-center hover:bg-red-100 box-border transition-colors"
                            onPress={() => setDeleteModalVisible(true)}
                        >
                            <Ionicons name="trash-bin" color="red" size={18}/>
                            <Text className="ml-3 text-red-600 text-base">Verwijderen</Text>
                        </Pressable>
                    </Kebab>
                    : null
            }

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
        </View>
    );
}

export default Comment;