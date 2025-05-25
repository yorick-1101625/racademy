import {Pressable, SafeAreaView, ScrollView, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import TopTabs from "@/components/TopTabs";
import ImagePicker from "@/components/ImagePicker";
import {Ionicons} from "@expo/vector-icons";
import fatty from "@/utils/fatty";
import {showError, showSuccess} from "@/utils/toast";
import {isISBN} from "@/utils/validators";
import useUser from "@/hooks/useUser";
import CreateSourceContent from "@/features/create/source/CreateSourceContent";
import truncate from "@/features/feed/utils/truncate";
import FocusableImage from "@/components/FocusableImage";
import MultilineTextInput from "@/components/MultilineTextInput";
import {router} from "expo-router";

const SOURCE_TYPES = [
    {value: 'video', label: 'Video'},
    {value: 'book', label: 'Boek'},
    {value: 'link', label: 'Link'}
]

const DIFFICULTIES = [
    {value: 'easy', label: 'Beginner'},
    {value: 'medium', label: 'Gemiddeld'},
    {value: 'hard', label: 'Gevorderd'},
    {value: 'expert', label: 'Professional'}
]

function CreateSource() {

    const { user } = useUser();

    // Form States
    const [type, setType] = useState('video');
    const [title, setTitle] = useState(null);
    const [schoolSubject, setSchoolSubject] = useState(null);
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState(null);
    const [difficulty, setDifficulty] = useState('easy');
    const [url, setUrl] = useState(null);
    const [isbn, setIsbn] = useState(null);
    const [image, setImage] = useState(null);

    function handleSubmit() {
        // Validation
        if (!(title.trim())) {
            showError('Titel is verplicht.');
            return;
        }
        if (!(schoolSubject.trim())) {
            showError('Vak is verplicht.');
            return;
        }
        if (!(subject.trim())) {
            showError('Onderwerp is verplicht.');
            return;
        }
        if (!(description.trim())) {
            showError('Beschrijving is verplicht.');
            return;
        }
        if (!(difficulty.trim())) {
            showError('Moeilijkheid is verplicht.');
            return;
        }
        if (!(type.trim())) {
            showError('Brontype is verplicht.');
            return;
        }
        if (type !== 'book' && !(url.trim())) {
            showError('URL is verplicht.');
            return;
        }
        if (type === 'book' && !(isbn.trim())) {
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
            type: type,
            image: imageData,
            description,
            difficulty,
            subject,
            title,
            isbn,
            url
        })
            .then(data => {
                if (data.success) {
                    showSuccess('Bron succesvol aangemaakt!');
                }
                else {
                    console.error(data.message);
                    showError('Er is iets misgegaan.');
                }
            });
    }

    return (
        <SafeAreaView className="flex-1 h-screen  bg-white">
            <View className="flex-1" />
                <ScrollView contentContainerClassName="p-4">
                    <TopTabs tabs={SOURCE_TYPES} state={[type, setType]} />

                    <TextInput
                        autoFocus={true}
                        className="border-b border-neutral-200 bg-white px-4 py-3 placeholder:text-neutral-500 outline-none"
                        placeholder="Titel"
                        onChangeText={setTitle}
                    />

                    <TextInput
                        className="border-b border-neutral-200 border-r-neutral-200 px-4 py-3 placeholder:text-neutral-600 outline-none"
                        placeholder="Vak"
                        onChangeText={setSchoolSubject}
                    />

                    <TextInput
                        className="border-b border-neutral-200 px-4 py-3 placeholder:text-neutral-600 outline-none"
                        placeholder="Onderwerp"
                        onChangeText={setSubject}
                    />

                    <TextInput
                        className="h-32 border-b bg-white border-neutral-200 px-4 py-3 placeholder:text-neutral-600 outline-none"
                        placeholder="Beschrijving" multiline={true}
                        onChangeText={setDescription}
                    />

                    <View className="flex-row mt-4 mb-4">
                        <TopTabs tabs={DIFFICULTIES} state={[difficulty, setDifficulty]} />
                    </View>

                    {/* URL */}
                    {
                        type !== 'book' && (
                            <TextInput
                                className="border-b border-neutral-200 px-4 py-3 mb-4 placeholder:text-neutral-600 outline-none"
                                placeholder={type === 'video' ? 'https://www.youtube.com/...' : 'https://www.voorbeeld.com/...'}
                                onChangeText={setUrl}
                            />
                        )
                    }

                    {/* ISBN */}
                    {
                        type === 'book' && (
                            <TextInput
                                className="border-b border-neutral-200 px-4 py-3 mb-4 placeholder:text-neutral-600 outline-none"
                                placeholder="ISBN"
                                onChangeText={setIsbn}
                            />
                        )
                    }
                    {
                        type !== 'video' ? <ImagePicker state={[image, setImage]}/> : <View className="flex-1"/>
                    }

                    <View className="w-full bg-white">
                        <Pressable
                            className="w-full h-14 items-center justify-center"
                            onPress={() => handleSubmit()}
                        >
                            <Ionicons name="return-up-forward" size={36} color="#3daad3"/>
                        </Pressable>
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default CreateSource;