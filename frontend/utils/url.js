import Constants from 'expo-constants';

let baseUrl;

if (process.env.EXPO_PUBLIC_BACKEND_URL) {
    baseUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    console.log("Set baseUrl as process.env.EXPO_PUBLIC_BACKEND_URL;")
} else if (__DEV__) {
    const { debuggerHost } = Constants.expoConfig;
    const ip = debuggerHost?.split(':').shift();
    baseUrl = `http://${ip}:5000`;
    console.log("Set baseUrl as expoConfig")
} else {
    baseUrl = "";
    console.log("No baseUrl defined. Check EXPO_PUBLIC_BACKEND_URL in your .env file.");
}

export const BASE_URL = baseUrl;
