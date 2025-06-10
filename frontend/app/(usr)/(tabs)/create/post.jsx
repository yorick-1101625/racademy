import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native';
import MultilineTextInput from "@/components/MultilineTextInput";
import {useEffect, useState} from "react";
import {showError, showSuccess} from "@/utils/toast";
import {Ionicons} from "@expo/vector-icons";
import BottomModal from "@/components/BottomModal";
import CompactSourceSelector from "@/features/create/post/CompactSourceSelector";
import fatty from "@/utils/fatty";
import AntDesign from "@expo/vector-icons/AntDesign";
import useUser from "@/hooks/useUser";
import {Link, useLocalSearchParams, useRouter} from "expo-router";
import {BASE_URL} from "@/utils/url";
import truncate from "@/features/feed/utils/truncate";

function CreatePost() {

    // Editing States
    const {id} = useLocalSearchParams();
    const [isEditing, setIsEditing] = useState(false);

    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [query, setQuery] = useState("");
    const [selectedSource, setSelectedSource] = useState(null);
    const [linkedSource, setLinkedSource] = useState(null);
    const router = useRouter();

    const {user} = useUser();

    function clearStates() {
        setIsEditing(false);

        // Clear states
        setContent("");
        setTags("");
        setSelectedSource(null);
        setLinkedSource(null);
    }

    useEffect(() => {
        if (id) {
            fatty(`/api/post/${id}`)
                .then(data => {
                    data = data?.data;
                    if (user.id === data?.user.id) {
                        setIsEditing(true);

                        // set the states
                        setContent(data.content);
                        if (data.tags.length) {
                            setTags('#' + (data.tags.join(" #")));
                        }
                        setLinkedSource(data.linked_source);
                        setSelectedSource(data.linked_source);
                    }
                });
        }
    }, [id, isEditing]);

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
            return;
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
            .map(tag => (tag.replace("#", "")));

        if (isEditing) {
            fatty(`/api/post/${id}`, 'PATCH', {
                content: content.trim(),
                tags: formattedTags,
                'source_id': linkedSource?.id
            })
                .then(data => {
                    if (data.success) {
                        showSuccess("Post succesvol Bewerkt.");
                        clearStates();

                        // Push to post page
                        router.push(`/posts?refresh=1`);
                    } else {
                        console.error(data.message);
                        showError("Er ging iets fout.");
                    }
                })
        }
        else {
            fatty('/api/post/', 'POST', {
                content: content.trim(),
                tags: formattedTags,
                'source_id': linkedSource?.id
            })
                .then(data => {
                    if (data.success) {
                        showSuccess("Post succesvol aangemaakt.");
                        clearStates();

                        router.push(`/posts?refresh=1`);
                    } else {
                        console.error(data.message);
                        showError("Er ging iets fout.");
                    }
                })
        }
    }

    return (
        <SafeAreaView className="flex-1">
            {
                isEditing && // Editing indicator
                <View className="p-3 bg-rac items-center justify-center flex-row ">
                    <Text className="text-base text-white">Je bent aan het bewerken</Text>
                    <Pressable
                        className="absolute right-5"
                        onPress={() => {
                            router.replace("/create/post?");
                            clearStates();
                        }}
                    >
                        <Ionicons name="close-circle-outline" size={22} color="white"/>
                    </Pressable>
                </View>
            }
            <ScrollView>

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
                            <View className="mb-1">
                                <Text className="text-base font-bold text-gray-900 mr-2">
                                    {user.username}
                                </Text>
                                <Text className="text-gray-500 text-sm">
                                    {user.email}
                                </Text>
                            </View>
                            <MultilineTextInput
                                placeholder="Wat wil je zeggen..."
                                className="w-full min-h-32 px-0 py-0 text-base placeholder:text-gray-400 outline-none"
                                onChangeText={setContent}
                                value={content}
                            />
                        </View>
                    </View>


                    <View className="flex-row items-center border-t border-gray-200 pt-2">
                        <TextInput
                            placeholder="#tags"
                            className="flex-1 text-base px-4 py-2 placeholder:text-neutral-400 outline-none"
                            onChangeText={handleTags}
                            value={tags}
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
                            <View className="items-center justify-between flex-row">
                                <View className="flex-row">
                                    <AntDesign name="link" size={14} color="#657786"/>
                                    <Text className="text-sm text-neutral-500 ml-1">Gekoppelde bron:</Text>
                                </View>
                                <Pressable onPress={() => setLinkedSource(null)}>
                                    <Ionicons name="close-circle-outline" size={22} color="#657786"/>
                                </Pressable>
                            </View>
                            <Text className="font-medium mt-1 text-neutral-800">
                                {truncate(linkedSource.title, 50)}
                            </Text>
                            <Text className="text-sm text-neutral-500">@{linkedSource.user.username}</Text>
                        </View>
                    )}
                </View>
                <View className="h-96 bg-gray-100"/>
            </ScrollView>
            <KeyboardAvoidingView className="absolute bottom-4 right-4">
                <Pressable
                    onPress={handleSubmit}
                    className="bg-rac w-14 h-14 items-center justify-center rounded-full active:opacity-80"
                >
                    <Ionicons name="return-up-forward" size={24} color="white"/>
                </Pressable>
            </KeyboardAvoidingView>

            <BottomModal state={[isModalVisible, setIsModalVisible]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View className="h-screen">
                        <TextInput
                            placeholder="Bron zoeken..."
                            autoFocus
                            className="mt-12 border border-gray-300 bg-gray-50 focus:border-rac outline-none px-4 py-3 rounded-lg placeholder:text-gray-600"
                            onChangeText={setQuery}
                        />

                        <CompactSourceSelector
                            query={query}
                            setSource={setSelectedSource}
                            selectedSource={selectedSource}
                        />

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
                </KeyboardAvoidingView>
            </BottomModal>
        </SafeAreaView>
    );
}

export default CreatePost;