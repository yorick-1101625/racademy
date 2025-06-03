import {Text, View} from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";
import {Link} from "expo-router";

function LinkedSource({linkedSource}) {
    return (
        <Link
            href={`/sources/${linkedSource.id}`}
            className="flex flex-col my-2 p-3 bg-neutral-50 rounded-lg border border-gray-200 w-full"
        >
        <View className="flex flex-col my-2 p-3 bg-neutral-50 rounded-lg border border-gray-200 w-full flex-wrap">
            <View className="items-center justify-between flex-row w-full flex-wrap">
                <View className="flex-row flex-wrap w-full">
                    <AntDesign name="link" size={14} color="#657786"/>
                    <Text className="text-sm text-neutral-500 ml-1 flex-shrink-0">Gekoppelde bron:</Text>
                </View>
            </View>
            <Text className="font-medium mt-1 text-neutral-800 break-words w-full flex-grow">{linkedSource.title}</Text>
            <Text className="text-sm text-neutral-500 break-words w-full flex-grow">@{linkedSource.user.username}</Text>
        </View>
        // </Link>
    );
}

export default LinkedSource;
