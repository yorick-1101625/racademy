import {Text, TextInput, View} from 'react-native';

function EmailPasswordFields({ setEmail, setPassword }) {
    return (
        <View className="w-full">
            <Text className="text-xl font-semibold">Email</Text>
            <TextInput
                className="
                    p-5 bg-white w-full rounded-md mb-8 mt-1 border border-hr
                    focus:outline-none focus:shadow-md focus:shadow-neutral-200 transition-shadow duration-100"
                inputMode="email" placeholder="Studentnummer@hr.nl"
                onChangeText={setEmail}
            />

            <Text className="text-xl font-semibold">Wachtwoord</Text>
            <TextInput
                className="p-5 bg-white w-full rounded-md mb-8 mt-1 border border-hr
                    focus:outline-none focus:shadow-md focus:shadow-neutral-200 transition-shadow duration-100"
                placeholder="Wachtwoord"
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={setPassword}
            />
        </View>
    );
}

export default EmailPasswordFields;