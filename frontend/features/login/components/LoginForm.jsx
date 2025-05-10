import {View} from 'react-native';
import EmailPasswordFields from "./EmailPasswordFields";
import FormSubmitButton from "./FormSubmitButton";
import ToggleRegistering from "./ToggleRegistering";
import {useContext, useState} from "react";
import {useRouter} from "expo-router";
import { showSuccess, showError } from "utils/toast"
import {UserContext} from "@/contexts/UserContext";
import useUser from "@/hooks/useUser";

function LoginForm() {

    const [isRegistering, setIsRegistering] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    const { register, login } = useUser();
    const router = useRouter();

    function handleToggleRegistering() {
        setIsRegistering(i => !i);
    }

    async function handleFormSubmit() {

        if (isRegistering) {
            // Validation
            if (email.trim() === "") {
                showError("Vul email in.");
                return;
            }
            const emailRegex = new RegExp(String.raw`^[\w\-\.]+@hr\.nl$`);
            if (!emailRegex.test(email)) {
                showError("Email moet eindigen op @hr.nl.");
                return;
            }
            if (password.trim() === "") {
                showError("Vul wachtwoord in.");
                return;
            }
            if (password !== confirmationPassword) {
                showError("Wachtwoorden komen niet overeen.");
                return;
            }

            try {
                await register(email, password);
                showSuccess("Account is succesvol aangemaakt.");
                setIsRegistering(i => !i);
            }
            catch (error) {
                console.error(error);
                showError("Dit e-mailadres bestaat al.");
            }
        }
        else {
            // Validation
            if (email.trim() === "") {
                showError("Vul email in.");
                return;
            }
            if (password.trim() === "") {
                showError("Vul wachtwoord in.");
                return;
            }

            try {
                await login(email, password);
                showSuccess("Je bent succesvol ingelogd");
                router.replace('/posts');
            }
            catch (error) {
                console.error(error);
                showError("Inloggen mislukt. Probeer het opnieuw.");
            }
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