import {Image, Text, View} from 'react-native';
import Logo from "../../../assets/logo.png";

function LogoHeader() {
    return (
        <View className="flex-row items-center justify-center">
            <Image source={Logo} className="w-36 h-36 max-w-36 max-h-36 " />
            {/*<Text className="font-bold text-4xl text-white">ROTTERDAM ACADEMY</Text>*/}
        </View>
    );
}

export default LogoHeader;