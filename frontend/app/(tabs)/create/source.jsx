import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import TopTabs from "@/components/TopTabs";
import ImagePicker from "@/components/ImagePicker";
import {Ionicons} from "@expo/vector-icons";
import fatty from "@/utils/fatty";
import {showError, showSuccess} from "@/utils/toast";
import {isISBN} from "@/utils/validators";

const SOURCE_TYPES = [
    {value: 'video',    label: 'Video'},
    {value: 'book',     label: 'Boek'},
    {value: 'link',  label: 'Link'}
]

const DIFFICULTIES = [
    {value: 'easy',     label: 'Beginner'},
    {value: 'medium',   label: 'Gemiddeld'},
    {value: 'hard',     label: 'Gevorderd'},
    {value: 'expert',   label: 'Professional'}
]

function CreateSource() {

    const [title, setTitle] = useState(null);
    const [schoolSubject, setSchoolSubject] = useState(null);
    const [subject, setSubject] = useState(null);
    const [description, setDescription] = useState(null);
    const [difficulty, setDifficulty] = useState('easy');
    const [sourceType, setSourceType] = useState('video');
    const [url, setUrl] = useState(null);
    const [isbn, setIsbn] = useState(null);
    const [image, setImage] = useState(null);

    function handleSubmit() {
        // Validation
        if (!title) {showError('Titel is verplicht.'); return;}
        if (!schoolSubject) {showError('Vak is verplicht.'); return;}
        if (!subject) {showError('Onderwerp is verplicht.'); return;}
        if (!description) {showError('Beschrijving is verplicht.'); return;}
        if (!difficulty) {showError('Moeilijkheid is verplicht.'); return;}
        if (!sourceType) {showError('Brontype is verplicht.'); return;}
        if (sourceType !== 'book' && !url) {showError('URL is verplicht.'); return;}
        if (sourceType === 'book' && !isbn) {showError('ISBN is verplicht'); return;}
        if (sourceType === 'book' && !isISBN(isbn)) {showError('ISBN is niet geldig.'); return;}
        if (sourceType === 'book' && !image) {showError('Foto is verplicht bij boeken.'); return;}
        if (image && image.type !== 'image') {showError('Bestand moet een foto zijn.'); return;}
        if (sourceType === 'video' && url.slice(0, 23) !== 'https://www.youtube.com') {
            showError('URL moet op https://www.youtube.com/.... lijken'); return;
        }
        const imageData = ( image ? {
            base64: image.base64,
            'mime_type': image.mimeType,
        } : null );

        fatty('/api/source/', 'POST', {
            'school_subject': schoolSubject,
            type: sourceType,
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
        <SafeAreaView className="flex-1 h-screen relative">
            {/* Titel */}
            <TextInput
                className="border-b border-neutral-200 bg-white px-4 py-3 placeholder:text-neutral-600 outline-none"
                placeholder="Titel"
                onChangeText={setTitle}
            />
            <View className="flex-row bg-white">
                <TextInput
                    className="w-1/2 border-b border-r border-neutral-200 border-r-neutral-200 px-4 py-3 placeholder:text-neutral-600 outline-none"
                    placeholder="Vak"
                    onChangeText={setSchoolSubject}
                />
                <TextInput
                    className="w-1/2 border-b border-neutral-200 px-4 py-3 placeholder:text-neutral-600 outline-none"
                    placeholder="Onderwerp"
                    onChangeText={setSubject}
                />
            </View>

            <TextInput
                className="h-32 border-b bg-white border-neutral-200 px-4 py-3 placeholder:text-neutral-600 outline-none"
                placeholder="Beschrijving" multiline={true}
                onChangeText={setDescription}
            />

            {/* Difficulty */}
            <View className="flex-row h-14 border-b bg-white border-neutral-200">
                {
                    DIFFICULTIES.map(item => (
                        <Pressable
                            className={`flex-1 justify-center items-center transition-colors duration-75 ${difficulty === item.value && 'bg-rac rounded-md'}`}
                            onPress={() => setDifficulty(item.value)}
                            key={item.value}
                        >
                            <Text className={`text-[0.9rem] transition-colors duration-75 ${difficulty === item.value ? 'text-white' : 'text-gray'} `}>{item.label}</Text>
                        </Pressable>
                    ))
                }
            </View>

            <View className="py-2 bg-white"/>

            <TopTabs tabs={SOURCE_TYPES} state={[sourceType, setSourceType]} />

            {/* URL */}
            {
                sourceType !== 'book' && (
                    <TextInput
                        className="border-b border-neutral-200 px-4 py-3 placeholder:text-neutral-600 outline-none"
                        placeholder={ sourceType === 'video' ? 'https://www.youtube.com/...' : 'https://www.voorbeeld.com/...' }
                        onChangeText={setUrl}
                    />
                )
            }

            {/* ISBN */}
            {
                sourceType === 'book' && (
                    <TextInput
                        className="border-b border-neutral-200 px-4 py-3 placeholder:text-neutral-600 outline-none"
                        placeholder="ISBN"
                        onChangeText={setIsbn}
                    />
                )
            }
            {
                sourceType !== 'video' ? <ImagePicker state={[image, setImage]} /> : <View className="flex-1" />
            }

            <View className="w-full bg-white">
                <Pressable
                    className="w-full h-14 items-center justify-center border-t border-neutral-300"
                    onPress={() => handleSubmit()}
                >
                    <Ionicons name="return-up-forward" size={36} color="#3daad3"/>
                </Pressable>
            </View>

        </SafeAreaView>
    );
}

export default CreateSource;