import {SafeAreaView, View} from 'react-native';

import LogoHeader from "../features/login/components/LogoHeader";
import LoginForm from "../features/login/components/LoginForm";

function Login() {
    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-neutral-100">
            <View className="w-11/12 sm:max-w-xl shadow-lg shadow-neutral-300 rounded-lg overflow-hidden">

                <LogoHeader />

                <LoginForm />

            </View>
        </SafeAreaView>
    );
}

export default Login;