import {Image, Text, View} from 'react-native';
import {Link} from "expo-router";

function ContentAuthor({ profilePicture, username, userId, email }) {

    const profilePicturePath = `http://localhost:5000/${profilePicture}`;

    return (
        // <Link href={`users/${userId}`} className="flex items-center">
        //     <Image source={{ uri: profilePicturePath }} className="w-12 h-12 bg-neutral-300 rounded-full cursor-pointer peer"/>
        //     <Text className="ml-3 text-lg cursor-pointer hover:underline peer-hover:underline text-rac">{ username }</Text>
        // </Link>

         <View className="flex-row justify-between items-center mb-2">
              <View>
                <Text className="text-base font-bold text-gray-800">
                  {username}
                </Text>
                <Text className="text-xs text-gray-500">{email}</Text>
              </View>
              <Image
                source={{ uri: profilePicturePath }}
                className="w-10 h-10"
              />
            </View>
    );
}

export default ContentAuthor;