import {TextInput, View} from 'react-native';

function EmailPasswordFields({ setEmail, setPassword, setConfirmationPassword, confirmPassword }) {
    return (
        <View className="w-full">
            <TextInput
                className="
                    w-full border border-neutral-300 rounded-md px-4 py-3 mb-6 bg-white placeholder:text-neutral-600 outline-none"
                inputMode="email" placeholder="Studentnummer@hr.nl"
                onChangeText={ setEmail }
                autoFocus={true}
                autoCorrect={false}
            />

            <TextInput
                className="w-full border border-neutral-300 rounded-md px-4 py-3 mb-6 bg-white placeholder:text-neutral-600 outline-none"
                placeholder="Wachtwoord"
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={ setPassword }
            />

            {
                confirmPassword &&
                <>
                    <TextInput
                        className="w-full border border-neutral-300 rounded-md px-4 py-3 mb-6 bg-white placeholder:text-neutral-600 outline-none"
                        placeholder="Herhaal Wachtwoord"
                        secureTextEntry={true}
                        autoCorrect={false}
                        onChangeText={ setConfirmationPassword }
                    />
                </>
            }
        </View>
    );
}

export default EmailPasswordFields;