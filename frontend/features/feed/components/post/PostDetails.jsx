import {Text, View} from 'react-native';
import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";

function PostDetails({ createdAt, tags }) {
    return (
        // <View>
        //     <Text className="italic text-neutral-600">{ calculateTimeFromToday(createdAt) }</Text>
        //     { tags && <Text className="italic text-neutral-600">{ tags.join(' ') }</Text> }
        // </View>
        <Text className="text-xs text-gray-400 mt-2">{ calculateTimeFromToday(createdAt) }</Text>
    );
}

export default PostDetails;