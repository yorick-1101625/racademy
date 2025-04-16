import {Image, Text, View} from 'react-native';
import Logo from "../../../assets/Logo.webp";

function LogoHeader() {
    return (
        <View className="flex-row items-center h-28 bg-rac rounded-t-lg overflow-hidden justify-center">
            {/*<Image source={Logo} className="w-28 h-28 max-w-28 max-h-28 " />*/}
            <Text className="font-bold text-4xl text-white">ROTTERDAM ACADEMY</Text>
        </View>
    );
}

export default LogoHeader;