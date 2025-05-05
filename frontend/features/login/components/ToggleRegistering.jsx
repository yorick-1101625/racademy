import { Pressable, Text, View } from 'react-native';

function ToggleRegistering({ text, onPress }) {
    return (
        <View className="w-full items-center px-6 mt-4">

            <View className="flex-row items-center w-full my-5">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-500 font-semibold text-sm">of</Text>
                <View className="flex-1 h-px bg-gray-300" />
            </View>

            <Pressable onPress={onPress}>
                <Text className="font-bold text-sm text-rac"> {text} </Text>
            </Pressable>
        </View>
    );
}

export default ToggleRegistering;
