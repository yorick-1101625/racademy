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
      Alert.alert('Error', 'New password and confirmation do not match.');
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
        showSuccess('Success', 'Password changed successfully. Please log in again.');
        logout();
        router.replace('/');
      } else {
        showError('Error', json.message || 'Failed to change password.');
      }
    } catch (error) {
      showError('Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Change Password</Text>
      <TextInput
        placeholder="Old Password"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
        className="border border-gray-300 rounded p-2 mb-4"
      />
      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        className="border border-gray-300 rounded p-2 mb-4"
      />
      <TextInput
        placeholder="Confirm New Password"
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
          {loading ? 'Changing...' : 'Change Password'}
        </Text>
      </Pressable>
    </View>
  );
}
