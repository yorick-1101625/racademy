import {Image, Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import {StatusBar} from "expo-status-bar";
import Logo from '../assets/Logo.webp';

function Login() {
    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-neutral-100">
            <StatusBar hidden={true}/>

            <View className="w-11/12 md:max-w-xl">

                <View className="flex-row items-center h-28 bg-hr rounded-t-lg overflow-hidden">
                    <Image source={Logo} className="w-28 h-full" />
                    <Text className="font-bold text-4xl italic text-white">academy</Text>
                </View>

                <View className="bg-white w-full rounded-b-lg shadow-lg overflow-hidden">

                    {/* Login Form */}
                    <View className="items-center w-full py-12 px-10">
                        <View className="w-full">
                            <Text className="text-xl font-semibold">Email</Text>
                            <TextInput
                                className="p-5 bg-white w-full rounded-md mb-8 mt-1 border border-hr"
                                inputMode="email" placeholder="Studentnummer@hr.nl"
                            />

                            <Text className="text-xl font-semibold">Wachtwoord</Text>
                            <TextInput
                                className="p-5 bg-white w-full rounded-md mb-8 mt-1 border border-hr"
                                placeholder="Wachtwoord"
                                secureTextEntry={true}
                                autoCorrect={false}
                            />
                        </View>

                        <Pressable className="w-2/3 items-center p-4 rounded-lg mt-4 bg-hr shadow-md shadow-neutral-300">
                            <Text className="text-xl text-white font-semibold">Log In</Text>
                        </Pressable>

                        {/* Register */}
                        <View className="w-2/3 items-center">
                            {/* Seperator */}
                            <View className="flex-row items-center my-3">
                                <View className="flex-1 h-[1px] bg-hr" />

                                <View>
                                    <Text className="w-8 text-center">of</Text>
                                </View>

                                <View className="flex-1 h-[1px] bg-hr" />
                            </View>

                            <Pressable>
                                <Text className="font-bold text-blue-800">Maak een nieuw account</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </View>

        </SafeAreaView>
    );
}

export default Login;