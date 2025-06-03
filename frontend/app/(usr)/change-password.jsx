import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useUser from '@/hooks/useUser';
import { BASE_URL } from '@/utils/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showSuccess, showError } from '@/utils/toast';
import fatty from "@/utils/fatty";

export default function ChangePassword() {
  const router = useRouter();
  const { logout } = useUser();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      showError('Fout', 'Nieuw wachtwoord en bevestiging komen niet overeen.');
      return;
    }

    setLoading(true);
    try {
      const data = await fatty(`/api/user/`, "PATCH", {
          old_password: oldPassword,
          new_password: newPassword,
        });

      if (data.success) {
        showSuccess('Gelukt', 'Wachtwoord succesvol gewijzigd. Log opnieuw in.');
        logout();
        router.replace('/');
      } else {
        showError('Fout', 'Wachtwoord wijzigen is mislukt.');
      }
    } catch (error) {
      showError('Fout', 'Er is een onverwachte fout opgetreden.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <SafeAreaView className="flex-1 bg-gray-100">
    <ScrollView
      contentContainerStyle={{ paddingBottom: 100 }}
      keyboardShouldPersistTaps="handled"
      className="flex-1"
    >
      <View className="p-6 border border-gray-100 rounded-lg bg-white">
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Oud wachtwoord</Text>
          <TextInput
            placeholder=""
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Nieuw wachtwoord</Text>
          <TextInput
            placeholder=""
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Bevestig nieuw wachtwoord</Text>
          <TextInput
            placeholder=""
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
          />
        </View>
      </View>
    </ScrollView>

    <KeyboardAvoidingView className="absolute bottom-12 right-4">
      <Pressable
        onPress={handleChangePassword}
        className="bg-rac w-14 h-14 items-center justify-center rounded-full active:opacity-80"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <Feather name="edit" size={21} color="white" />
        )}
      </Pressable>
    </KeyboardAvoidingView>
  </SafeAreaView>
  );
}
