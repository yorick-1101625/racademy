import {View} from 'react-native';
import EmailPasswordFields from "./EmailPasswordFields";
import FormSubmitButton from "./FormSubmitButton";
import ToggleRegistering from "./ToggleRegistering";
import {useRef, useState} from "react";
import logIn from "@/features/login/utils/logIn";
import registerUser from "@/features/login/utils/registerUser";
import {useRouter} from "expo-router";
import { showSuccess, showError } from "utils/toast"

function LoginForm() {

    const [isRegistering, setIsRegistering] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    const router = useRouter();

    function handleToggleRegistering () {
        setIsRegistering(i => !i);
    }

    function handleFormSubmit() {

        if (isRegistering) {
            const result = registerUser(email, password, confirmationPassword);
            result
                .then(error => {
                    if (error instanceof Error) {
                        console.error(error); // notify user
                        showError("Registratie mislukt. Probeer het opnieuw.")
                    }
                    else {
                        console.log("success");
                        setIsRegistering(i => !i);
                        showSuccess("Je account is succesvol aangemaakt.");
                    }
                })
        }
        else {
            const result = logIn(email, password);
            result
                .then(error => {
                    if (error instanceof Error) {
                        console.error(error); // notify user
                        showError("Ongeldige inloggegevens.")
                    }
                    else {
                        console.log("success");
                        router.replace('/tabs/');
                        showSuccess("Je bent succesvol ingelogd")
                    }
                })
        }
    }

    return (
        <View className="bg-white w-full rounded-b-lg overflow-hidden">
            <View className="items-center w-full py-3 px-10">

                <EmailPasswordFields
                    setEmail={ setEmail }
                    setPassword={ setPassword }
                    setConfirmationPassword={ setConfirmationPassword }
                    confirmPassword={isRegistering}
                />

                <FormSubmitButton onPress={handleFormSubmit} text={ isRegistering ? "Registreer" : "Log In"} />

                <ToggleRegistering
                    text={ isRegistering ? "Ga terug naar inloggen" : "Maak een nieuw account"}
                    onPress={handleToggleRegistering}
                />
            </View>
        </View>
    );
}

export default LoginForm;