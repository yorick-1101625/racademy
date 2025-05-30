import {Text, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

function Error({ title = "Er is iets misgegaan.", message = "Probeer het later opnieuw.", children }){
    return (
        <View className="flex-1 items-center justify-center">
            <Ionicons name="warning-outline" color="orange" size={64} />
            <Text className="text-lg font-semibold text-gray-800 mb-2">
                {title}
            </Text>
            <Text className="text-gray-500 text-center px-6 mb-4">
                {message}
            </Text>
            { children }
        </View>
    );
}

export default Error;