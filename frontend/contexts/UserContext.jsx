import {createContext, useState} from 'react';
import {showError} from "@/utils/toast";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    async function login(email, password) {
        try {
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
                        sessionStorage.setItem("access_token", data['access_token']);
                        return true;
                    } else {
                        throw new Error(data.message);
                    }
                })
        }
        catch (error) {
            console.error(error);
            showError("Ongeldige inloggegevens.");
        }
    }

    async function register(email, password) {
        try {
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
        catch (error) {
            console.error(error);
            showError("Dit email bestaat al.");
        }
    }

    async function logout() {
        sessionStorage.clear();
    }

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            { children }
        </UserContext.Provider>
    );
}