import {Image, Text} from 'react-native';
import {Link} from "expo-router";

function ContentAuthor({ profilePicture, username, userId }) {

    const profilePicturePath = `http://localhost:5000/${profilePicture}`;

    return (
        <Link href={`users/${userId}`} className="flex items-center">
            <Image source={{ uri: profilePicturePath }} className="w-12 h-12 bg-neutral-300 rounded-full cursor-pointer peer"/>
            <Text className="ml-3 text-lg cursor-pointer hover:underline peer-hover:underline text-rac">{ username }</Text>
        </Link>
    );
}

export default ContentAuthor;