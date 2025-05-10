export default async function registerUser(email, password, confirmationPassword) {
    // Error Handling
    if (email.trim() === "") {
        return Error("Must provide email");
    }
    const emailRegex = new RegExp(String.raw`^[\w\-\.]+@hr\.nl$`);
    if (!emailRegex.test(email)) {
        return Error("Email must look like abc123@hr.nl");
    }
    if (password.trim() === "") {
        return Error("Must provide password");
    }
    if (password !== confirmationPassword) {
        return Error("Password and confirmation must be the same.");
    }


    // Register User !No token since user does not need to authenticate yet
    const url = "http://127.0.0.1:5000/api/user/";

    return fetch(url, {
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
            return Error(data.message);
        }
    })
    .catch(error => {
        return Error(`Could not register user: ${error}`);
    });
}