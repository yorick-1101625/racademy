import {Pressable, Text} from 'react-native';

function FormSubmitButton({ text, onPress }) {
  return (
    <Pressable
      className="w-full items-center py-3 rounded-md bg-rac"
      onPress={onPress}
    >
      <Text className="text-base text-white font-semibold">{text}</Text>
    </Pressable>
  );
}

export default FormSubmitButton;
