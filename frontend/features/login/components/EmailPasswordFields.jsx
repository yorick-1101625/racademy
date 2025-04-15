import {Text, TextInput, View} from 'react-native';

function EmailPasswordFields() {
    return (
        <View className="w-full">
            <Text className="text-xl font-semibold">Email</Text>
            <TextInput
                className="p-5 bg-white w-full rounded-md mb-8 mt-1 border border-hr"
                inputMode="email" placeholder="Studentnummer@hr.nl"
            />

            <Text className="text-xl font-semibold">Wachtwoord</Text>
            <TextInput
                className="p-5 bg-white w-full rounded-md mb-8 mt-1 border border-hr"
                placeholder="Wachtwoord"
                secureTextEntry={true}
                autoCorrect={false}
            />
        </View>
    );
}

export default EmailPasswordFields;