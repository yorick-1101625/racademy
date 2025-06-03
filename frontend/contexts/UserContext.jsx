import {createContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "@/utils/url";
import fatty from "@/utils/fatty";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    async function login(email, password) {
        const url = `${BASE_URL}/api/auth/login`;
        const data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }).then(response => response.json())

        if (data.success) {
            await Promise.all([
                AsyncStorage.setItem('access', data.access_token),
                AsyncStorage.setItem('refresh', data.refresh_token),
            ])
            await getUser();
        }
        else {
            throw new Error(data.message);
        }
    }

    async function getUser() {
        try {
            const data = await fatty('/api/user/current');
            if (data.success) {
                setUser(data.user);
            }
            else {
                setUser(null);
            }
        }
        catch (error) {
            console.error(error);
            setUser(null);
        }
        finally {
            setAuthChecked(true);
        }
    }

    async function register(email, password) {
        const url = `${BASE_URL}/api/user/`;
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
        setUser(null);
        await AsyncStorage.clear();
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <UserContext.Provider value={{ user, login, setUser, register, logout, authChecked }}>
            { children }
        </UserContext.Provider>
    );
}