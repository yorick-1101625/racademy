import {SafeAreaView} from 'react-native';
import useUser from '../../../hooks/useUser';
import UserProfile from "@/features/users/UserProfile";
import {useNavigation} from "expo-router";
import {useLayoutEffect} from "react";

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1">
        <UserProfile user={user} />
    </SafeAreaView>
  );
}