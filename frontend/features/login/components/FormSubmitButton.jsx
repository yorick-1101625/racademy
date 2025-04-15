import {Pressable, Text} from 'react-native';

function FormSubmitButton({ text, onPress }) {
    return (
        <Pressable
            className="w-2/3 items-center p-4 rounded-lg mt-4 bg-hr shadow-md shadow-neutral-300 hover:bg-rose-700 transition-colors duration-100"
            onPress={onPress}
        >
            <Text className="text-xl text-white font-semibold">{ text }</Text>
        </Pressable>
    );
}

export default FormSubmitButton;