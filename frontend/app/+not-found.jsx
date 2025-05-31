import {Text, View} from 'react-native';
import Error from "@/components/Error";
import {Link} from "expo-router";

function NotFound() {

    return (
        <View className="flex-1">
            <Error title="Kon deze pagina niet vinden." message="">
                <Link href="/">
                    <Text className="underline text-rac text-base">Terug naar Feed</Text>
                </Link>
            </Error>
        </View>
    );
}

export default NotFound;