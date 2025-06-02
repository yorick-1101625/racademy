import {Image, Text, View} from 'react-native';
import {Link} from "expo-router";
import {BASE_URL} from "@/utils/url";

function ContentAuthor({profilePicture, username, userId, email}) {

    return (
        <View className="mb-2">
            <Link href={`/users/${userId}`}>
                <View className="flex-row items-center">
                    <Image
                        source={{uri: `${BASE_URL}${profilePicture}`}}
                        className="w-10 h-10 rounded-full"
                    />
                    <View className="ml-3">
                        <Text className="text-base font-bold text-gray-800">{username}</Text>
                        <Text className="text-gray-500 text-xs">{email}</Text>
                    </View>
                </View>
            </Link>
        </View>
    );
}

export default ContentAuthor;