import {Text, View} from 'react-native';
import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";

function PostDetails({ createdAt, tags }) {
    return (
        <View>
            <Text className="italic text-neutral-600">{ calculateTimeFromToday(createdAt) }</Text>
            <Text className="italic text-neutral-600">{ tags.join(' ') }</Text>
        </View>
    );
}

export default PostDetails;