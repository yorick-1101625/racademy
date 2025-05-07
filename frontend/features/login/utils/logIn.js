import { BASE_URL } from "utils/url"

export default async function logIn(email, password) {
    // Error Handling
    if (email.trim() === "") {
        return Error("Must provide email");
    }
    if (password.trim() === "") {
        return Error("Must provide password");
    }

    const url = `${BASE_URL}/api/login/`; // trailing slash to match Flask route

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
            console.log(data);
            return true;
        } else {
            return Error(data.message);
        }
    })
    .catch(error => {
            return Error(`Could not log in user: ${error}`);
    });
}