import {Text, View} from 'react-native';
import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";

function PostDetails({ createdAt, tags }) {
    return (
        <View className="flex-col">
            { Array.isArray(tags) && tags.length > 0 && <Text className="text-[0.85rem] text-gray-500 mt-2">#{ tags.join(' #') }</Text> }
            <Text className="text-[0.85rem] text-gray-500">{ calculateTimeFromToday(createdAt) }</Text>
        </View>
    );
}

export default PostDetails;