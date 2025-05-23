import {Text, View} from 'react-native';

function CompactSource({title, username}) {
    return (
        <View className="py-4 border-b border-gray-200">
            <Text className="font-bold text-lg text-gray-800">{ title }</Text>
            <Text className="text-gray-500">{ username }</Text>
        </View>
    );
}

export default CompactSource;