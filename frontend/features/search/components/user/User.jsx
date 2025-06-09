import {Image, Text, View} from "react-native";
import {Link} from "expo-router";
import {BASE_URL} from "@/utils/url";


function User({user}) {

    return (
        <Link
            className="flex-row flex items-center px-4 py-3 bg-white border-t border-gray-200"
            href={`/users/${user.id}`}
        >
            <Image
                source={{uri: `${BASE_URL}${user.profile_picture}`}}
                className="w-10 h-10 rounded-full mr-3 bg-gray-300"
            />
            <View className="flex-1">
                <Text className="font-semibold text-base text-black">
                    {user.email}
                </Text>
                <Text className="text-gray-500">@{user.username}</Text>
            </View>
        </Link>
    );
}

export default User;