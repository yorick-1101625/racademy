import {
    Pressable,
    SafeAreaView,
    TextInput,
    Text,
    KeyboardAvoidingView,
    View,
    Image
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
import ContentAuthor from "@/features/feed/components/ContentAuthor";
import useUser from "@/hooks/useUser";
import {Link} from "expo-router";
import {BASE_URL} from "@/utils/url";

function CreatePost() {

    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [query, setQuery] = useState("");
    const [selectedSource, setSelectedSource] = useState(null);
    const [linkedSource, setLinkedSource] = useState(null);

    const {user} = useUser();

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

                <View className="flex-row">
                    <View className="mr-3">
                        <Link href={`users/${user.id}`}>
                            <Image
                                source={{uri: `${BASE_URL}${user.profile_picture}`}}
                                className="w-10 h-10 rounded-full"
                            />
                        </Link>
                    </View>

                    <View className="flex-1">
                        <View className="flex-row items-center mb-1">
                            <Text className="text-base font-bold text-gray-900 mr-2">
                                {user.username}
                            </Text>
                            <Text className="text-gray-500 text-sm">
                                {user.email}
                            </Text>
                        </View>

                        <MultilineTextInput
                            placeholder="Wat wil je zeggen..."
                            className="w-full min-h-24 text-base py-1 placeholder:text-gray-400 outline-none"
                            onChangeText={setContent}
                            textAlignVertical="top"
                            multiline
                        />
                    </View>
                </View>


                <View className="flex-row items-center border-t border-gray-200 pt-2">
                    <TextInput
                        placeholder="#tags"
                        className="flex-1 text-base px-4 py-2 placeholder:text-neutral-400 outline-none"
                        onChangeText={handleTags}
                    />

                    <Pressable
                        onPress={() => setIsModalVisible(true)}
                        className="flex-row items-center px-3 py-2 rounded-md bg-neutral-100 ml-2"
                    >
                        <AntDesign name="paperclip" size={16} color="#657786"/>
                        <Text className="text-neutral-500 ml-1">Bron</Text>
                    </Pressable>
                </View>

                {linkedSource && (
                    <View className="mt-2 p-3 bg-neutral-50 rounded-lg border border-gray-200">
                        <View className="flex-row items-center">
                            <AntDesign name="link" size={14} color="#657786"/>
                            <Text className="text-sm text-neutral-500 ml-1">Gekoppelde bron:</Text>
                        </View>
                        <Text className="font-medium mt-1 text-neutral-800">{linkedSource.title}</Text>
                        <Text className="text-sm text-neutral-500">@{linkedSource.user.username}</Text>
                    </View>
                )}
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