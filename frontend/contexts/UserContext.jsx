import {createContext, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    async function login(email, password) {
        const url = "http://127.0.0.1:5000/api/login/";
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setUser(data.user);
                    return AsyncStorage.setItem('token', data.access_token)
                        .then(() => {
                            return true;
                        });
                } else {
                    throw new Error(data.message);
                }
            })
    }

    async function register(email, password) {
        const url = "http://127.0.0.1:5000/api/user/";
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                return true;
            } else {
                throw new Error(data.message);
            }
        })
    }

    async function logout() {
        await AsyncStorage.clear();
    }

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            { children }
        </UserContext.Provider>
    );
}