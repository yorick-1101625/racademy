import { View, Text } from "react-native";

function NoResults({ title = "Geen resultaten", message = "Begin met zoeken om resultaten te vinden." }){
    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
                {title}
            </Text>
            <Text className="text-gray-500 text-center px-6 mb-4">
                {message}
            </Text>
        </View>
    );
}

export default NoResults;
