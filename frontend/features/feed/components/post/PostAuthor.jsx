import {Image, Text, View} from 'react-native';

function PostAuthor({ profilePicture, username }) {
    return (
        <View className="flex-row items-center">
            <Image source={ profilePicture } className="w-12 h-12 bg-neutral-300 rounded-full cursor-pointer peer"/>
            <Text className="ml-3 text-lg cursor-pointer hover:underline peer-hover:underline text-rac">{ username }</Text>
        </View>
    );
}

export default PostAuthor;