import {SafeAreaView, View} from 'react-native';

import LogoHeader from "../features/login/components/LogoHeader";
import LoginForm from "../features/login/components/LoginForm";
import GuestOnly from "@/components/GuestOnly";

function Login() {
    return (
        <GuestOnly>
            <SafeAreaView className="flex-1 items-center justify-center bg-white">
                <View className="w-11/12 max-w-md">

                    <LogoHeader />

                    <LoginForm />

                </View>
            </SafeAreaView>
        </GuestOnly>
    );
}

export default Login;