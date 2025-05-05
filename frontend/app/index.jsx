import {SafeAreaView, View} from 'react-native';

import LogoHeader from "../features/login/components/LogoHeader";
import LoginForm from "../features/login/components/LoginForm";

function Login() {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <View className="w-11/12 max-w-md">

                <LogoHeader />

                <LoginForm />

            </View>
        </SafeAreaView>
    );
}

export default Login;