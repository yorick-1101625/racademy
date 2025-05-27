import {
    Pressable,
    SafeAreaView,
    TextInput,
    Text,
    KeyboardAvoidingView,
    View
} from 'react-native';
import MultilineTextInput from "@/components/MultilineTextInput";
import React, {useState} from "react";
import {showError, showSuccess} from "@/utils/toast";
import {Ionicons} from "@expo/vector-icons";
import BottomModal from "@/components/BottomModal";
import CompactSourceSelector from "@/features/create/post/CompactSourceSelector";
import CompactSource from "@/features/create/post/CompactSource";
import fatty from "@/utils/fatty";
import AntDesign from "@expo/vector-icons/AntDesign";

function CreatePost() {

    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [query, setQuery] = useState("");
    const [selectedSource, setSelectedSource] = useState(null);
    const [linkedSource, setLinkedSource] = useState(null);

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
        if (!(content.trim())) {
            showError("Post mag niet leeg zijn.");
            return
        }

        // Split tags to array, remove empty strings, to lowercase, remove #
        let formattedTags = tags
            .trim()
            .split(' ');

        const hasInvalidTag = formattedTags.some(tag => (tag[0] !== '#' && tag.length > 0) || tag.length === 1);
        if (hasInvalidTag) {
            showError("Tag kan niet leeg zijn.");
            return;
        }

        formattedTags = formattedTags
            .filter(tag => tag !== '')
            .map(tag => (tag.replace("#", "")).toLowerCase());

        fatty('/api/post/', 'POST', {
            content: content,
            tags: formattedTags,
            'source_id': linkedSource?.id
        })
            .then(data => {
                if (data.success) {
                    showSuccess("Post succesvol aangemaakt.");
                } else {
                    console.error(data.message);
                    showError("Er ging iets fout.");
                }
            })
    }

    return (
        <SafeAreaView className="flex-1">
            <View className="bg-white p-4">
                <MultilineTextInput
                    placeholder="Wat wil je zeggen..."
                    className="w-full border-b border-neutral-200 px-4 py-3 placeholder:text-neutral-500 outline-none"
                    onChangeText={setContent}
                />
                <TextInput
                    placeholder="#..."
                    className="border-b border-neutral-200 px-4 py-3 placeholder:text-neutral-500 outline-none"
                    onChangeText={handleTags}
                />
                <Pressable
                    onPress={() => setIsModalVisible(true)}
                >
                    {
                        linkedSource
                            ? <CompactSource username={linkedSource.user.username} title={linkedSource.title}/>
                            : <View
                                className="flex-row border-b border-neutral-200 px-4 py-3 placeholder:text-neutral-500 outline-none">
                                <Text className="text-neutral-500 py-3">Bron toevoegen </Text>
                                <AntDesign name="paperclip" size={19} color="gray" className="py-3"/>
                            </View>

                    }
                </Pressable>
            </View>

            <KeyboardAvoidingView className="absolute bottom-4 right-4">
                <Pressable
                    onPress={handleSubmit}
                    className="bg-rac p-3 rounded-full active:opacity-80"
                >
                    <Ionicons name="return-up-forward" size={24} color="white"/>
                </Pressable>
            </KeyboardAvoidingView>

            <BottomModal state={[isModalVisible, setIsModalVisible]}>
                <View className="h-screen">
                    <TextInput
                        placeholder="Bron zoeken..."
                        autoFocus
                        className="mt-12 border border-gray-300 focus:border-rac outline-none px-4 py-3 rounded-lg placeholder:text-gray-600"
                        onChangeText={setQuery}
                    />

                    <CompactSourceSelector query={query} setSource={setSelectedSource} selectedSource={selectedSource}/>

                    <View className="flex-row justify-between space-x-3">
                        <Pressable
                            onPress={() => setIsModalVisible(false)}
                            className="flex-1 py-3 bg-gray-200 rounded-md"
                        >
                            <Text className="text-center text-black font-semibold">Annuleren</Text>
                        </Pressable>

                        <Pressable
                            className="flex-1 py-3 bg-rac rounded-md"
                            onPress={() => {
                                setLinkedSource(selectedSource);
                                setIsModalVisible(false);
                            }}
                        >
                            <Text className="text-center text-white font-semibold">Toepassen</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomModal>
        </SafeAreaView>
    );
}

export default CreatePost;