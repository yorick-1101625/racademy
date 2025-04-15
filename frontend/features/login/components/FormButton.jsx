import {Pressable, Text} from 'react-native';

function FormButton({ text }) {
    return (
        <Pressable className="w-2/3 items-center p-4 rounded-lg mt-4 bg-hr shadow-md shadow-neutral-300">
            <Text className="text-xl text-white font-semibold">{ text }</Text>
        </Pressable>
    );
}

export default FormButton;