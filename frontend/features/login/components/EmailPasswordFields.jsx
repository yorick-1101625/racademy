import {Text, TextInput, View} from 'react-native';

function EmailPasswordFields({ emailRef, passwordRef, confirmPassword, confirmPasswordRef }) {
    return (
        <View className="w-full">
            <Text className="text-xl font-semibold">Email</Text>
            <TextInput
                className="
                    p-5 bg-white w-full rounded-md mb-8 mt-1 border border-rac placeholder:text-neutral-500
                    focus:outline-none focus:shadow-md focus:shadow-neutral-200 transition-shadow duration-100"
                inputMode="email" placeholder="Studentnummer@hr.nl"
                ref={emailRef}
                autoFocus={true}
                autoCorrect={false}
            />

            <Text className="text-xl font-semibold">Wachtwoord</Text>
            <TextInput
                className="p-5 bg-white w-full rounded-md mb-8 mt-1 border border-rac placeholder:text-neutral-500
                    focus:outline-none focus:shadow-md focus:shadow-neutral-200 transition-shadow duration-100"
                placeholder="Wachtwoord"
                secureTextEntry={true}
                autoCorrect={false}
                ref={passwordRef}
            />

            {
                confirmPassword &&
                <>
                    <Text className="text-xl font-semibold">Herhaal Wachtwoord</Text>
                    <TextInput
                        className="p-5 bg-white w-full rounded-md mb-8 mt-1 border border-hr placeholder:text-neutral-500
                            focus:outline-none focus:shadow-md focus:shadow-neutral-200 transition-shadow duration-100 border-rac"
                        placeholder="Herhaal Wachtwoord"
                        secureTextEntry={true}
                        autoCorrect={false}
                        ref={confirmPasswordRef}
                    />
                </>
            }
        </View>
    );
}

export default EmailPasswordFields;