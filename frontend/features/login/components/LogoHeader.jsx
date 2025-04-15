import {Image, Text, View} from 'react-native';
import Logo from "../../../assets/Logo.webp";

function LogoHeader() {
    return (
        <View className="flex-row items-center h-28 bg-hr rounded-t-lg overflow-hidden">
            <Image source={Logo} className="w-28 h-full" />
            <Text className="font-bold text-4xl italic text-white">academy</Text>
        </View>
    );
}

export default LogoHeader;