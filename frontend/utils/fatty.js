import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "@/utils/url";

export default async function fatty(url, method, body) {

    const token = await AsyncStorage.getItem('token')
    const res = await fetch(`${BASE_URL}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body)
        });

    return await res.json();
}