import {Image, Text, View} from 'react-native';
import {Link} from "expo-router";
import {BASE_URL} from "@/utils/url";

function ContentAuthor({profilePicture, username, userId, email}) {

    return (
        <View className="flex-row items-center mb-2">
            <Link href={`/users/${userId}`} className="justify-center flex">
                <Image
                    source={{uri: `${BASE_URL}${profilePicture}`}}
                    className="w-10 h-10 rounded-full"
                />
                <View className="justify-center ml-3">
                    <Text className="text-base font-bold text-gray-800">
                        {username}
                    </Text>
                    <Text className="text-gray-500 text-[0.85rem]">{email}</Text>
                </View>
            </Link>
        </View>
    );
}

export default ContentAuthor;