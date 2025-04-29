import {View} from 'react-native';
import EmailPasswordFields from "./EmailPasswordFields";
import FormSubmitButton from "./FormSubmitButton";
import ToggleRegistering from "./ToggleRegistering";
import {useRef, useState} from "react";
import logIn from "@/features/login/utils/logIn";
import registerUser from "@/features/login/utils/registerUser";

function LoginForm() {

    const [isRegistering, setIsRegistering] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);


    function handleToggleRegistering () {
        setIsRegistering(i => !i);
    }

    function handleFormSubmit() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (isRegistering) {
            const confirmationPassword = confirmPasswordRef.current?.value;
            const result = registerUser(email, password, confirmationPassword);
            result.then(r => console.log(r))
            if (result instanceof Error) {
                console.error(result); // notify user
            }
            else {
                console.log("success");
                // return to login and notify user
            }
        }
        else {
            const result = logIn(email, password);
            if (result instanceof Error) {
                console.error(result); // notify user
            }
            else {
                console.log("success");
                // maybe navigate to another screen or save user token
            }
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