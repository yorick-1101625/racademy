import {View} from 'react-native';
import EmailPasswordFields from "./EmailPasswordFields";
import FormButton from "./FormButton";
import ToggleRegistering from "./ToggleRegistering";
import {useState} from "react";

function LoginForm() {

    const [isRegistering, setIsRegistering] = useState(false);

    function onToggleRegistering () {
        setIsRegistering(i => !i);
    }

    return (
        <View className="bg-white w-full rounded-b-lg shadow-lg overflow-hidden">
            <View className="items-center w-full py-12 px-10">

                <EmailPasswordFields />

                <FormButton text={ isRegistering ? "Maak Aan" : "Log In"} />

                <ToggleRegistering
                    text={ isRegistering ? "Ga terug naar inloggen" : "Maak een nieuw account"}
                    onPress={onToggleRegistering}
                />
            </View>
        </View>
    );
}

export default LoginForm;