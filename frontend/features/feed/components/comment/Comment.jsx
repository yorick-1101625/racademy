import {View, Text, Image} from "react-native";
import {BASE_URL} from "@/utils/url";

function Comment({comment}) {
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
                <View className="flex-row items-center mb-1">
                    <Text className="font-bold text-gray-900 mr-2">
                        {comment.user.username}
                    </Text>
                    <Text className="text-gray-500 text-xs">
                        {comment.user.email}
                    </Text>
                </View>

                <Text className="text-gray-900 mb-1">
                    {comment.content}
                </Text>
            </View>
        </View>
    );
}

export default Comment;