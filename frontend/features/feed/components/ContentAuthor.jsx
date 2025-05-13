import {Image, Text, View} from 'react-native';
import {Link} from "expo-router";
import {BASE_URL} from "@/utils/url";

function ContentAuthor({profilePicture, username, userId, email}) {

    return (
        <View className="flex-row justify-between items-center mb-2">
            <View>
                <Text className="text-base font-bold text-gray-800">
                    {username}
                </Text>
                <Text className="text-xs text-gray-500">{email}</Text>
            </View>
            <Link href={`users/${userId}`}>
                <Image
                    source={{uri: `${BASE_URL}${profilePicture}`}}
                    className="w-10 h-10 rounded-full"
                />
            </Link>
        </View>
    );
}

export default ContentAuthor;