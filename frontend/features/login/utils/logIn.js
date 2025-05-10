import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function logIn(email, password) {
    // Error Handling
    if (email.trim() === "") {
        return Error("Must provide email");
    }
    if (password.trim() === "") {
        return Error("Must provide password");
    }

    const url = "http://127.0.0.1:5000/api/login/"; // trailing slash to match Flask route

    return fetch(url, {
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
                return AsyncStorage.setItem('token', data.access_token)
                    .then(() => {
                        return true;
                    });
            } else {
                return Error(data.message);
            }
        })
        .catch(error => {
            return Error(`Could not log in user: ${error}`);
        });
}