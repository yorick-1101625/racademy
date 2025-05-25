import Profile from '../profile';
import { useLocalSearchParams } from 'expo-router';

export default function UserProfileWrapper() {
  const { id } = useLocalSearchParams();

  return <Profile userId={id} />;
}