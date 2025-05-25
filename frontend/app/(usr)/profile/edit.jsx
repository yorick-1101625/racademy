import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import useUser from '../../../hooks/useUser';
import { BASE_URL } from '../../../utils/url';
import fatty from '../../../utils/fatty';
import ImagePicker from '../../../components/ImagePicker';
import { showSuccess, showError } from '../../../utils/toast';

export default function EditProfile() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [study, setStudy] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setStudy(user.study || '');
      if (user.profile_picture) {
        setProfilePicture({ uri: `${BASE_URL}${user.profile_picture}` });
      }
    }
  }, [user]);

  async function handleSave() {
    setLoading(true);
    try {
      const data = { username, study };
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

  if (!user) {
    return <Text>Niet ingelogd</Text>;
  }

  return (
    <View className="p-6">
      <Text className="text-xl font-bold mb-4">Bewerk Profiel</Text>

      <Text>Profiel Foto</Text>
      <View className="w-32 h-32 mb-4 border border-gray-300 rounded overflow-hidden">
        <ImagePicker state={[profilePicture, setProfilePicture]} />
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

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Opslaan" onPress={handleSave} />
      )}
    </View>
  );
}