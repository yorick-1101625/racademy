import {SafeAreaView, View} from 'react-native';

import LogoHeader from "../features/login/components/LogoHeader";
import LoginForm from "../features/login/components/LoginForm";

function Login() {
    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-neutral-100">
            <View className="w-11/12 md:max-w-xl">

                <LogoHeader />

                <LoginForm />

            </View>

        </SafeAreaView>
    );
}

export default Login;