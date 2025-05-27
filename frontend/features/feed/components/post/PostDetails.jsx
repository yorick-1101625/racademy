import {Text, View} from 'react-native';
import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";

function PostDetails({ createdAt, tags }) {
    return (
        <View className="flex-col">
            { tags.length > 0 && <Text className="text-xs text-gray-500 mt-2">#{ tags.join(' #') }</Text> }
            <Text className="text-xs text-gray-500">{ calculateTimeFromToday(createdAt) }</Text>
        </View>
    );
}

export default PostDetails;