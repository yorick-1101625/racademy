import {useRouter} from "expo-router";
import {Pressable, Text, View} from "react-native";
import useUser from "@/hooks/useUser";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useState} from "react";
import BottomModal from "@/components/BottomModal";
import fatty from "@/utils/fatty";
import {showError, showSuccess} from "@/utils/toast";

function Settings() {
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const {logout, user} = useUser()
    const router = useRouter();

    function handleLogout() {
        logout().then(() => router.replace('/'))
    }

    async function handleDeleteUser() {
        try {
            const data = await fatty(`/api/user/${user.id}`, 'DELETE');
            if (data.success) {
                showSuccess('Succes', 'Account is verwijderd.');
                // After delete, logout and redirect
                logout().then(() => router.replace('/'));
            } else {
                showError('Fout', 'Kon gebruiker niet verwijderen.');
            }
        } catch (error) {
            showError('Fout', 'Er is een fout opgetreden bij het verwijderen van de gebruiker.');
        }
    }
    return (
        <>
            <View className="flex-1">
                <View className="bg-white">
                    <Pressable
                        onPress={() => setLogoutModalVisible(true)}
                        className="flex-row items-center px-4 py-4 border-b border-t border-gray-100"
                    >
                        <MaterialIcons name="logout" size={21.5} color="black"/>
                        <Text className="ml-3 text-base text-black">Uitloggen</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => router.push('/change-password')}
                        className="flex-row items-center px-4 py-4 border-b border-gray-100"
                    >
                        <Ionicons name="lock-closed" size={21.5} color="black"/>
                        <Text className="ml-3 text-base text-black">Verander Wachtwoord</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setDeleteModalVisible(true)}
                        className="flex-row items-center px-4 py-4 border-b border-gray-100"
                    >
                        <Ionicons name="trash-bin" size={21.5} color="red"/>
                        <Text className="ml-3 text-base text-red-600">Verwijder Account</Text>
                    </Pressable>
                </View>
            </View>

            <BottomModal state={[logoutModalVisible, setLogoutModalVisible]}>
                <View className="items-center mb-4">
                    <MaterialIcons name="logout" size={64} color="#EF4444"/>
                </View>

                <Text className="text-lg font-semibold mb-6 text-center text-black">
                    Weet je zeker dat je wilt uitloggen?
                </Text>

                <View className="flex-row justify-between space-x-3">
                    <Pressable
                        onPress={() => setLogoutModalVisible(false)}
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

            <BottomModal state={[deleteModalVisible, setDeleteModalVisible]}>
                <View className="items-center mb-4">
                    <Ionicons name="trash-bin" size={64} color="red"/>
                </View>

                <Text className="text-lg font-semibold mb-6 text-center text-black">
                    Weet je zeker dat je je account wilt verwijderen?
                </Text>

                <View className="flex-row justify-between space-x-3">
                    <Pressable
                        onPress={() => setDeleteModalVisible(false)}
                        className="flex-1 py-3 bg-gray-200 rounded-md"
                    >
                        <Text className="text-center text-black font-semibold">Nee</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleDeleteUser}
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
