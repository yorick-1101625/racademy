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
                }
                else {
                    console.error(data.message);
                    showError("Er ging iets fout.");
                }
            })
    }

    return (
        <SafeAreaView className="flex-1 h-full relative">
            <View className="border-b border-gray-300 w-full h-full">
                <MultilineTextInput
                    placeholder="Wat wil je zeggen..."
                    className="px-4 py-3 placeholder:text-gray-600 text-lg bg-white border-b border-gray-100"
                    onChangeText={setContent}
                />
                <TextInput
                    placeholder="#..."
                    className="px-4 py-3 placeholder:text-gray-600 bg-white border-b border-gray-200"
                    onChangeText={handleTags}
                />
                <Pressable
                    onPress={() => setIsModalVisible(true)}
                    className="bg-white px-4 py-2"
                >
                    {
                        linkedSource
                            ?   <CompactSource username={linkedSource.user.username} title={linkedSource.title} />
                            :   <View className="border-b border-gray-200">
                                    <Text className="text-gray-600 py-3">Bron toevoegen</Text>
                                </View>

                    }
                </Pressable>
            </View>

            <KeyboardAvoidingView className="absolute right-0 bottom-0">
                <Pressable
                    onPress={handleSubmit}
                    className="bg-rac w-24 h-12 items-center justify-center rounded-full mb-3 mr-3"
                >
                    <Ionicons name="return-up-forward" size={36} color="white"/>
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