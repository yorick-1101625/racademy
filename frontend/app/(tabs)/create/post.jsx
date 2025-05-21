import {Pressable, SafeAreaView, TextInput, Text, KeyboardAvoidingView, View} from 'react-native';
import MultilineTextInput from "@/components/MultilineTextInput";
import {useState} from "react";
import {showError} from "@/utils/toast";

function CreatePost() {

    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    function handleTags(value) {
        if (value.trim()) {
            const values = value.split(" ");
            values.forEach(tag => {
                if (tag && tag[0] !== "#") {
                    showError(`${tag} moet beginnen met een #.`);
                }
            });
        }

        setTags(value);
    }

    function handleSubmit() {
        // Split tags to array, remove empty strings, to lowercase, remove #
        const formattedTags = tags
            .trim()
            .split(' ');

        const hasInvalidTag = formattedTags.some(tag => tag[0] !== '#' || tag.length === 1);
        if (hasInvalidTag) {
            showError("Tag kan niet leeg zijn.");
            return;
        }

        formattedTags
            .map(tag => tag.slice(1, -1))
            .filter(tag => tag !== '');

        console.log(formattedTags, '#dewfs'.slice(1,-1))
    }

    return (
        <SafeAreaView className="flex-1 h-full relative">
            <View className="border-b border-gray-300 w-full h-full">
                <MultilineTextInput
                    placeholder="Wat wil je zeggen..."
                    className="px-4 py-3 placeholder:text-gray-600 text-lg bg-white"
                    onChangeText={setContent}
                />
                <TextInput
                    placeholder="#..."
                    className="px-4 py-3 placeholder:text-gray-600 bg-white"
                    onChangeText={handleTags}
                />
            </View>

            <KeyboardAvoidingView className="absolute right-0 bottom-0">
                <Pressable
                    onPress={handleSubmit}
                    className="bg-rac w-24 h-10 items-center justify-center rounded-full mb-3 mr-3"
                >
                    <Text className="text-white text-lg">Post</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default CreatePost;