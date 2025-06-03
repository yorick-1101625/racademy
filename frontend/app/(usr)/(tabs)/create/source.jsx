import {KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, TextInput, View} from 'react-native';
import {useEffect, useState} from "react";
import TopTabs from "@/components/TopTabs";
import ImagePicker from "@/components/ImagePicker";
import {Ionicons} from "@expo/vector-icons";
import fatty from "@/utils/fatty";
import {showError, showSuccess} from "@/utils/toast";
import {isISBN} from "@/utils/validators";
import useUser from "@/hooks/useUser";
import {useLocalSearchParams, useRouter} from "expo-router";
import {Text} from 'react-native';
import {BASE_URL} from "@/utils/url";

const SOURCE_TYPES = [
    {value: 'video', label: 'Video'},
    {value: 'book', label: 'Boek'},
    {value: 'article', label: 'Link'}
]

const DIFFICULTIES = [
    {value: 'easy', label: 'Beginner'},
    {value: 'medium', label: 'Gemiddeld'},
    {value: 'hard', label: 'Gevorderd'},
    {value: 'expert', label: 'Professional'}
]

function CreateSource() {
    // Editing States
    const { id } = useLocalSearchParams();
    const {user} = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    function clearStates() {
        setIsEditing(false);

        // Clear states
        setType("video");
        setTitle("");
        setSchoolSubject("");
        setSubject("");
        setDescription("");
        setDifficulty("easy");
        setUrl("");
        setIsbn("");
        setImage(null);
    }

    useEffect(() => {
         if (id) {
            fatty(`/api/source/${id}`)
                .then(data => {
                    data = data?.data;
                    if (user.id === data?.user.id) {
                        setIsEditing(true);

                        // set the states
                        setType(data.type);
                        setTitle(data.title);
                        setSchoolSubject(data['school_subject']);
                        setSubject(data.subject);
                        setDescription(data.description);
                        setDifficulty(data.difficulty);
                        setUrl(data.url);
                        setIsbn(data.isbn);
                        setImage({uri: `${BASE_URL}${data.image}`});
                    }
                });
        }
    }, [id, isEditing]);


    // Form States
    const [type, setType] = useState("video");
    const [title, setTitle] = useState("");
    const [schoolSubject, setSchoolSubject] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [url, setUrl] = useState("");
    const [isbn, setIsbn] = useState("");
    const [image, setImage] = useState(null);

    function handleSubmit() {
        // Validation
        if (!(title?.trim())) {
            showError('Titel is verplicht.');
            return;
        }
        if (!(schoolSubject?.trim())) {
            showError('Vak is verplicht.');
            return;
        }
        if (!(subject?.trim())) {
            showError('Onderwerp is verplicht.');
            return;
        }
        if (!(description?.trim())) {
            showError('Beschrijving is verplicht.');
            return;
        }
        if (!(difficulty?.trim())) {
            showError('Moeilijkheid is verplicht.');
            return;
        }
        if (!(type?.trim())) {
            showError('Brontype is verplicht.');
            return;
        }
        if (type !== 'book' && !(url?.trim())) {
            showError('URL is verplicht.');
            return;
        }
        if (type === 'book' && !(isbn?.trim())) {
            showError('ISBN is verplicht');
            return;
        }
        if (type === 'book' && !isISBN(isbn)) {
            showError('ISBN is niet geldig.');
            return;
        }
        if (type === 'book' && !image) {
            showError('Foto is verplicht bij boeken.');
            return;
        }
        if (image && image.type !== 'image') {
            showError('Bestand moet een foto zijn.');
            return;
        }
        if (type === 'video' && url.slice(0, 23) !== 'https://www.youtube.com') {
            showError('URL moet op https://www.youtube.com/.... lijken');
            return;
        }
        const imageData = (image ? {
            base64: image.base64,
            'mime_type': image.mimeType,
        } : null);

        fatty('/api/source/', 'POST', {
            'school_subject': schoolSubject,
            image: imageData,
            description,
            type: type,
            difficulty,
            subject,
            title,
            isbn,
            url
        })
            .then(data => {
                if (data.success) {
                    showSuccess('Bron succesvol aangemaakt!');
                    // router.push(`/sources/${data.data.id}`);
                    clearStates();
                    router.push('/sources?refresh=1');
                } else {
                    console.error(data.message);
                    showError('Er is iets misgegaan.');
                }
            });
    }

    function handleEdit() {
        // Validation
        if (!(title?.trim())) {
            showError('Titel is verplicht.');
            return;
        }
        if (!(schoolSubject?.trim())) {
            showError('Vak is verplicht.');
            return;
        }
        if (!(subject?.trim())) {
            showError('Onderwerp is verplicht.');
            return;
        }
        if (!(description?.trim())) {
            showError('Beschrijving is verplicht.');
            return;
        }
        if (!(difficulty?.trim())) {
            showError('Moeilijkheid is verplicht.');
            return;
        }
        if (!(type?.trim())) {
            showError('Brontype is verplicht.');
            return;
        }
        if (type !== 'book' && !(url?.trim())) {
            showError('URL is verplicht.');
            return;
        }
        if (type === 'book' && !(isbn?.trim())) {
            showError('ISBN is verplicht');
            return;
        }
        if (type === 'book' && !isISBN(isbn)) {
            showError('ISBN is niet geldig.');
            return;
        }
        if (type === 'book' && !image) {
            showError('Foto is verplicht bij boeken.');
            return;
        }
        if (type === 'video' && url.slice(0, 23) !== 'https://www.youtube.com') {
            showError('URL moet op https://www.youtube.com/.... lijken');
            return;
        }
        let imageData;
        if (image.base64) {
            imageData = {
                base64: image.base64,
                'mime_type': image.mimeType,
            };
        }
        console.log(imageData)

        fatty(`/api/source/${id}`, 'PATCH', {
            'school_subject': schoolSubject,
            image: imageData,
            description,
            type: type,
            difficulty,
            subject,
            title,
            isbn,
            url
        })
            .then(data => {
                if (data.success) {
                    showSuccess('Bron succesvol Bijgewerkt!');
                    clearStates();
                    router.push(`/sources/${id}`);
                } else {
                    console.error(data.message);
                    showError('Er is iets misgegaan.');
                }
            });
    }

    return (
        <>
            <SafeAreaView className="flex-1">
                {
                    isEditing && // Editing indicator
                    <View className="p-3 bg-rac items-center justify-center flex-row ">
                        <Text className="text-base text-white">Je bent aan het bewerken</Text>
                        <Pressable
                            className="absolute right-5"
                            onPress={() => {
                                router.replace("/create/source?");
                                clearStates();
                            }}
                        >
                            <Ionicons name="close-circle-outline" size={22} color="white"/>
                        </Pressable>
                    </View>
                }
                <ScrollView contentContainerClassName="bg-white p-4">
                    <TopTabs tabs={SOURCE_TYPES} state={[type, setType]}/>

                    <TextInput
                        className="text-sm border-b border-gray-200 px-4 py-3 placeholder:text-neutral-500 outline-none"
                        placeholder="Titel"
                        onChangeText={setTitle}
                        value={title}
                    />

                    <TextInput
                        className="text-sm border-b border-gray-200 border-r-neutral-200 px-4 py-3 placeholder:text-neutral-500 outline-none"
                        placeholder="Vak"
                        onChangeText={setSchoolSubject}
                        value={schoolSubject}
                    />

                    <TextInput
                        className="text-sm border-b border-gray-200 px-4 py-3 placeholder:text-neutral-500 outline-none"
                        placeholder="Onderwerp"
                        onChangeText={setSubject}
                        value={subject}
                    />

                    <TextInput
                        className="text-sm h-32 border-b border-gray-200 px-4 py-3 placeholder:text-neutral-500 outline-none"
                        placeholder="Beschrijving" multiline={true}
                        onChangeText={setDescription}
                        value={description}
                    />

                    <View className="flex-row mt-4 mb-4">
                        <TopTabs tabs={DIFFICULTIES} state={[difficulty, setDifficulty]}/>
                    </View>

                    {/* URL */}
                    {
                        type !== 'book' && (
                            <TextInput
                                className="text-sm border-b border-gray-200 px-4 py-3 mb-4 placeholder:text-neutral-500 outline-none"
                                placeholder={type === 'video' ? 'https://www.youtube.com/...' : 'https://www.voorbeeld.com/...'}
                                onChangeText={setUrl}
                                value={url}
                            />
                        )
                    }

                    {/* ISBN */}
                    {
                        type === 'book' && (
                            <TextInput
                                className="text-sm border-b border-gray-200 px-4 py-3 mb-4 placeholder:text-neutral-500 outline-none"
                                placeholder="ISBN"
                                onChangeText={setIsbn}
                                value={isbn}
                            />
                        )
                    }

                    {
                        type === 'book' &&
                            <View className="h-56">
                                <ImagePicker
                                    className="border-2 border-dashed border-gray-300 rounded-lg"
                                    state={[image, setImage]}
                                />
                            </View>
                    }
                </ScrollView>
            </SafeAreaView>

            <KeyboardAvoidingView className="absolute bottom-4 right-4">
                <Pressable
                    onPress={() => isEditing ? handleEdit() : handleSubmit()}
                    className="bg-rac w-14 h-14 items-center justify-center rounded-full active:opacity-80 z-10"
                >
                    <Ionicons name="return-up-forward" size={24} color="white"/>
                </Pressable>
            </KeyboardAvoidingView>
        </>
    );
}

export default CreateSource;