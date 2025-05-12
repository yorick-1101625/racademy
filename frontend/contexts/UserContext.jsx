import {createContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext(null);


export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

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
            .then(async data => {
                if (data.success) {
                    await getUser(data.access_token);
                    return AsyncStorage.setItem('token', data.access_token)
                        .then(() => {
                            return true;
                        });
                } else {
                    throw new Error(data.message);
                }
            })
    }

    async function getUser(token) {
        try {
            const url = "http://127.0.0.1:5000/api/user/current";
            const data = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => res.json())
            if (data.success) {
                setUser(data.user);
            }
            else {
                setUser(null);
                console.log(data)
            }
        }
        catch (error) {
            setUser(null);
        }
        finally {
            setAuthChecked(true);
        }
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

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then(token => getUser(token));
    }, [])

    return (
        <UserContext.Provider value={{ user, login, register, logout, authChecked }}>
            { children }
        </UserContext.Provider>
    );
}