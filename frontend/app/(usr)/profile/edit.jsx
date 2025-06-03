import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    ActivityIndicator,
    Alert,
    Pressable,
    KeyboardAvoidingView, SafeAreaView
} from 'react-native';
import {useNavigation, useRouter} from 'expo-router';
import useUser from '../../../hooks/useUser';
import {BASE_URL} from '../../../utils/url';
import fatty from '../../../utils/fatty';
import ImagePicker from '../../../components/ImagePicker';
import {showSuccess, showError} from '../../../utils/toast';
import {Feather, Ionicons} from "@expo/vector-icons";
import {SafeAreaContext} from "react-native-safe-area-context";

export default function EditProfile() {
    const {user, setUser} = useUser();
    const router = useRouter();

    const [username, setUsername] = useState(user.username);
    const [study, setStudy] = useState(user.study);
    const [profilePicture, setProfilePicture] = useState(
        {uri: `${BASE_URL}${user.profile_picture}`}
    );
    const [loading, setLoading] = useState(false);


    async function handleSave() {
        setLoading(true);
        try {
            const data = {username, study};
            if (profilePicture && profilePicture.base64) {
                data.image = {
                    base64: profilePicture.base64,
                    mime_type: 'image/jpeg',
                };
            }

            const response = await fatty('/api/user', 'PATCH', data);

            if (response?.success) {
                setUser(response.data);
                showSuccess('Succes', 'Profiel bijgewerkt');
                router.replace('/profile');
            } else {
                showError('Fout', 'Profiel bijwerken mislukt');
            }
        } catch (error) {
            console.error(error);
            showError('Fout', 'Er is iets misgegaan');
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView className="flex-1 border-t border-gray-200">
            <View className="bg-white p-6">

                <View className="items-center mb-6">
                    <View className="w-36 h-36 rounded-full border border-gray-300 overflow-hidden">
                        <ImagePicker state={[profilePicture, setProfilePicture]}/>
                    </View>
                    <Text className="text-sm text-gray-500 mt-2">Tik om te wijzigen</Text>
                </View>

                <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-1">Gebruikersnaam</Text>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        placeholder=""
                        className="outline-none focus:border-rac border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                    />
                </View>

                <View className="mb-6">
                    <Text className="text-sm font-medium text-gray-700 mb-1">Studie</Text>
                    <TextInput
                        value={study}
                        onChangeText={setStudy}
                        placeholder=""
                        className="outline-none focus:border-rac border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                    />
                </View>
            </View>


            <KeyboardAvoidingView className="absolute bottom-12 right-4">
                <View
                    className="bg-rac w-14 h-14 items-center justify-center rounded-full active:opacity-80"
                >
                    {loading ? (
                        <ActivityIndicator color="white" size="large" className="flex-1 items-center justify-center"/>
                    ) : (
                        <Pressable
                            className="flex-1 items-center justify-center"
                            onPress={handleSave}
                        >
                            <Feather name="edit" size={21} color="white"/>
                        </Pressable>

                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}