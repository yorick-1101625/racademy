import {Pressable, Text, View} from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";
import {Link} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

function LinkedSource({linkedSource}) {

    return (
        <Link href={`/sources/${linkedSource.id}`}>
            <View className="mt-2 p-3 bg-neutral-50 rounded-lg border w-full border-gray-200">
                <View className="items-center justify-between flex-row">
                    <View className="flex-row">
                        <AntDesign name="link" size={14} color="#657786"/>
                        <Text className="text-sm text-neutral-500 ml-1">Gekoppelde bron:</Text>
                    </View>
                </View>
                <Text className="font-medium mt-1 text-neutral-800">{linkedSource.title}</Text>
                <Text className="text-sm text-neutral-500">@{linkedSource.user.username}</Text>
            </View>
        </Link>
    );
}

export default LinkedSource;
