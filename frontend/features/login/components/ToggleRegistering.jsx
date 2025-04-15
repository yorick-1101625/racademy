import {Pressable, Text, View} from 'react-native';

function ToggleRegistering({ text, onPress }) {
    return (
        <View className="w-2/3 items-center">
            {/* Seperator */}
            <View className="flex-row items-center my-3">
                <View className="flex-1 h-[1px] bg-hr" />
                <View>
                    <Text className="w-8 text-center">of</Text>
                </View>
                <View className="flex-1 h-[1px] bg-hr" />
            </View>

            <Pressable onPress={onPress}>
                <Text className="font-bold text-blue-800">{ text }</Text>
            </Pressable>
        </View>
    );
}

export default ToggleRegistering;