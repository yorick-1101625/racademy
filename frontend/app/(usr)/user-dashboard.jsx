import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'react-native';
import { Link } from 'expo-router';
import useFetch from '../../hooks/useFetch';
import {BASE_URL} from "@/utils/url";
import Error from "@/components/Error";
import React from "react";

export default function AdminDashboard() {
  const { width } = useWindowDimensions();
  const isWide = width > 600; //

  const { data: users, isPending, error } = useFetch('/api/user/');

  if (isPending) {
    return (
      <View style={styles.centered}>
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#3daad3"/>
        </View>;
        <Text>Loading users...</Text>
      </View>
    );
  }

  if (error) return <Error />

  return (
    <ScrollView style={styles.container}>
      {users.map(user => (
        <View key={user.id} style={styles.userRow}>
          <Link href={`users/${user.id}`} style={styles.link}>
            <Image
              source={{ uri: `${BASE_URL}${user.profile_picture}` }}
              style={[
                styles.avatar,
                {
                  width: isWide ? 56 : 48,
                  height: isWide ? 56 : 48,
                  borderRadius: isWide ? 28 : 24
                },
              ]}
            />
          </Link>
          <View style={styles.textContainer}>
            <Link href={`users/${user.id}`} style={styles.link}>
              <Text style={[
                styles.username,
                { fontSize: isWide ? 18 : 16 }
              ]}>
                {user.username || 'Naam onbekend'}
              </Text>
            </Link>
            <Text style={[
              styles.email,
              { fontSize: isWide ? 16 : 14 }
            ]}>
              {user.email}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 12,
  },
  avatar: {
    backgroundColor: '#D4D4D4',
  },
  textContainer: {
    marginLeft: 12,
  },
  username: {
    fontWeight: '600',
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  email: {
    color: '#6B7280',
  },
  link: {
    cursor: 'pointer',
  },
});
