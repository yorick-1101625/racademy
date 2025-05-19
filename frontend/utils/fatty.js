import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "@/utils/url";
import {isTokenExpired, refreshToken} from "@/utils/tokens";

export default async function fatty(url, method = 'GET', body = null, refresh = false) {

    if (body) { // stringify if there is a body
        body = JSON.stringify(body);
    }

    // Choose if the bearer token is the access token or refresh token
    const item = (refresh ? 'refresh' : 'access');
    let token = await AsyncStorage.getItem(item);

    if (!refresh && token && isTokenExpired(token)) {
        await refreshToken(); // refresh access token if it is almost expired
        token = await AsyncStorage.getItem(item);
    }

    const res = await fetch(`${BASE_URL}${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: body
        });

    return await res.json();
}
