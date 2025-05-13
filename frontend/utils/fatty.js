import AsyncStorage from "@react-native-async-storage/async-storage";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export default async function fatty(url, method, body) {

    const token = await AsyncStorage.getItem('token')
    const res = await fetch(`${backendUrl}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        });

    return await res.json();
}