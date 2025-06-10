import {Text, View} from 'react-native';
import truncate from "@/features/feed/utils/truncate";

function CompactSource({title, username}) {
    return (
        <View className="py-4 border-b border-gray-200">
            <Text className="font-semibold text-lg text-gray-800">{ truncate(title, 40) }</Text>
            <Text className="text-gray-500">@{ username }</Text>
        </View>
    );
}

export default CompactSource;