import {Pressable, Image, View, Text} from "react-native";
import { useRouter } from "expo-router";
import {BASE_URL} from "@/utils/url";


function User({user}) {
    const router = useRouter();
    return (
        <Pressable className="flex-row items-center px-4 py-3 bg-white border-t border-gray-200"
                   onPress={() => router.push(`/user/${user.id}`)}
        >
            <Image
                source={{uri: `${BASE_URL}${user.profile_picture}`}}
                className="w-10 h-10 rounded-full mr-3 bg-gray-300"
            />
            <View className="flex-1">
                <Text className="font-semibold text-base text-black">
                    {user.email || "Naam onbekend"}
                </Text>
                <Text className="text-gray-500">@{user.username}</Text>
            </View>
        </Pressable>
    );
}

export default User;