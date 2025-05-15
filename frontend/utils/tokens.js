import fatty from "@/utils/fatty";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function refreshToken() {
    try {
        const data = await fatty('/api/auth/refresh', 'POST', undefined, true);
        if (data.success) {
            await AsyncStorage.setItem('access', data.access_token);
        }
        else {
            console.error("Could not refresh token.");
        }
    }
    catch (e) {
        console.error(e);
    }
}

export function isTokenExpired(token) {
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));

    return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.exp;
}
