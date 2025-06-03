import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import useUser from '@/hooks/useUser';
import { BASE_URL } from '@/utils/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showSuccess, showError } from '@/utils/toast';

export default function ChangePassword() {
  const router = useRouter();
  const { user, logout } = useUser();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Fout', 'Nieuw wachtwoord en bevestiging komen niet overeen.');
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('access');
      const res = await fetch(`${BASE_URL}/api/user/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        showSuccess('Gelukt', 'Wachtwoord succesvol gewijzigd. Log opnieuw in.');
        logout();
        router.replace('/');
      } else {
        showError('Fout', json.message || 'Wachtwoord wijzigen is mislukt.');
      }
    } catch (error) {
      showError('Fout', 'Er is een onverwachte fout opgetreden.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Wachtwoord wijzigen</Text>
      <TextInput
        placeholder="Oud wachtwoord"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
        className="border border-gray-300 rounded p-2 mb-4"
      />
      <TextInput
        placeholder="Nieuw wachtwoord"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        className="border border-gray-300 rounded p-2 mb-4"
      />
      <TextInput
        placeholder="Bevestig nieuw wachtwoord"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        className="border border-gray-300 rounded p-2 mb-4"
      />
      <Pressable
        onPress={handleChangePassword}
        disabled={loading}
        className="bg-blue-600 rounded p-3"
      >
        <Text className="text-white text-center font-semibold">
          {loading ? 'Wijzigen...' : 'Wachtwoord wijzigen'}
        </Text>
      </Pressable>
    </View>
  );
}
