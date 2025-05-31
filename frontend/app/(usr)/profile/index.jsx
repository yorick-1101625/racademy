import {SafeAreaView} from 'react-native';
import useUser from '../../../hooks/useUser';
import UserProfile from "@/features/users/UserProfile";

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <SafeAreaView>
        <UserProfile user={user} />
    </SafeAreaView>
  );
}