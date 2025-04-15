import {View} from 'react-native';
import EmailPasswordFields from "./EmailPasswordFields";
import FormSubmitButton from "./FormSubmitButton";
import ToggleRegistering from "./ToggleRegistering";
import {useState} from "react";

function LoginForm() {

    const [isRegistering, setIsRegistering] = useState(false);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    function handleToggleRegistering () {
        setIsRegistering(i => !i);
    }

    function handleFormSubmit() {
        console.log(email, password);

        if (isRegistering) {
            // make new account
        }
        else {
            // log in
        }
    }

    return (
        <View className="bg-white w-full rounded-b-lg overflow-hidden">
            <View className="items-center w-full py-12 px-10">

                <EmailPasswordFields setEmail={setEmail} setPassword={setPassword} />

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