import {useRouter} from "expo-router";
import {Modal, Pressable, Text, View} from "react-native";
import useUser from "@/hooks/useUser";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import React, {useState} from "react";
import BottomModal from "@/components/BottomModal";

function Settings() {
    const [modalVisible, setModalVisible] = useState(false);
    const {logout} = useUser()
    const router = useRouter();

    function handleLogout() {
        logout().then(() => router.replace('/'))
    }

    return (
        <>
            <View className="flex-1">
                <View className="bg-white pt-4">
                    <Pressable
                        onPress={() => setModalVisible(true)}
                        className="flex-row items-center px-4 py-4 border-b border-t border-gray-100"
                    >
                        <MaterialIcons name="logout" size={21.5} color="black"/>
                        <Text className="ml-3 text-base text-black">Logout</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => router.push('/change-password')}
                        className="flex-row items-center px-4 py-4 border-b border-gray-100"
                    >
                        <Ionicons name="lock-closed" size={21.5} color="black"/>
                        <Text className="ml-3 text-base text-black">Change Password</Text>
                    </Pressable>

                    <Pressable
                        className="flex-row items-center px-4 py-4 border-b border-gray-100"
                    >
                        <Ionicons name="trash-bin" size={21.5} color="red"/>
                        <Text className="ml-3 text-base text-red-600">Delete Account</Text>
                    </Pressable>
                </View>
            </View>

            <BottomModal state={[modalVisible, setModalVisible]}>
                <View className="items-center mb-4">
                    <MaterialIcons name="logout" size={64} color="#EF4444"/>
                </View>

                <Text className="text-lg font-semibold mb-6 text-center text-black">
                    Weet je zeker dat je wilt uitloggen?
                </Text>

                <View className="flex-row justify-between space-x-3">
                    <Pressable
                        onPress={() => setModalVisible(false)}
                        className="flex-1 py-3 bg-gray-200 rounded-md"
                    >
                        <Text className="text-center text-black font-semibold">Nee</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleLogout}
                        className="flex-1 py-3 bg-red-600 rounded-md"
                    >
                        <Text className="text-center text-white font-semibold">Ja</Text>
                    </Pressable>
                </View>
            </BottomModal>
        </>
    );
}

export default Settings;