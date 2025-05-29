import {View, Text, Image, Pressable} from "react-native";
import {BASE_URL} from "@/utils/url";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import BottomModal from "@/components/BottomModal";

function Comment({comment}) {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <View className="flex-row p-4 border-t border-gray-200 bg-white">
            <View className="mr-3">
                <View className="items-center justify-center">
                    <Image
                        source={{uri: `${BASE_URL}${comment.user.profile_picture}`}}
                        className="w-10 h-10 rounded-full"
                    />
                </View>
            </View>

            <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                    <View>
                        <Text className="font-bold text-gray-900 mr-2">
                            {comment.user.username}
                        </Text>
                        <Text className="text-gray-500 text-xs">
                            {comment.user.email}
                        </Text>
                    </View>
                    <Pressable
                        onPress={() => setIsVisible(true)}

                    >
                        <Ionicons name="ellipsis-horizontal" color="gray" size={16}/>
                    </Pressable>
                </View>

                <Text className="text-gray-900 mb-1">
                    {comment.content}
                </Text>
            </View>

            <BottomModal state={[isVisible, setIsVisible]}>
                <View className="bg-white rounded-t-xl">
                    <View className="py-1">
                        <Pressable
                            className="flex-row items-center px-5 py-3.5"
                            onPress={() => {
                                setIsVisible(false);
                            }}
                        >
                            <Ionicons
                                name="trash-bin"
                                size={20}
                                color="red"
                                className="mr-3"
                            />
                            <Text className="text-red-500 text-base">Verwijderen</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomModal>
        </View>
    );
}

export default Comment;