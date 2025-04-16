import {View} from 'react-native';
import EmailPasswordFields from "./EmailPasswordFields";
import FormSubmitButton from "./FormSubmitButton";
import ToggleRegistering from "./ToggleRegistering";
import {useRef, useState} from "react";

function LoginForm() {

    const [isRegistering, setIsRegistering] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    function handleToggleRegistering () {
        setIsRegistering(i => !i);
    }

    function handleFormSubmit() {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        console.log(email, password);

        if (isRegistering) {
            const confirmPassword = confirmPasswordRef.current.value;
            console.log(confirmPassword);
            // make new account
        }
        else {
            // log in
        }
    }

    return (
        <View className="bg-white w-full rounded-b-lg overflow-hidden">
            <View className="items-center w-full py-12 px-10">

                <EmailPasswordFields
                    emailRef={emailRef}
                    passwordRef={passwordRef}
                    confirmPassword={isRegistering}
                    confirmPasswordRef={confirmPasswordRef}
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