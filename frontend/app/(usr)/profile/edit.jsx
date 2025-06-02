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
import {Ionicons} from "@expo/vector-icons";
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

    const navigation = useNavigation();

    // Set tab title at the top of the screen
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => "",
        });
    }, [navigation]);

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
        <SafeAreaView className="p-6 relative flex-1">

            <Text>Profiel Foto</Text>
            <View className="w-32 h-32 mb-4 border border-gray-300 rounded overflow-hidden">
                <ImagePicker state={[profilePicture, setProfilePicture]}/>
            </View>

            <Text>Gebruikersnaam</Text>
            <TextInput
                value={username}
                onChangeText={setUsername}
                className="border border-gray-300 rounded p-2 mb-4"
            />

            <Text>Studie</Text>
            <TextInput
                value={study}
                onChangeText={setStudy}
                className="border border-gray-300 rounded p-2 mb-4"
            />


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
                            <Ionicons name="return-up-forward" size={24} color="white"/>
                        </Pressable>

                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}