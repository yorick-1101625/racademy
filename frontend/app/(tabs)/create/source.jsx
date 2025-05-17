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
    {value: 'article',  label: 'Artikel'},
    {value: 'course',   label: 'Cursus'}
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
        // if (!isISBN(isbn)) {showError('ISBN is niet geldig'); return;}
        if (sourceType === 'book' && !image) {showError('Foto is verplicht'); return;}
        if (image && image.type !== 'image') {showError('Bestand moet een foto zijn.'); return;}

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
        <SafeAreaView className="flex-1 bg-white h-screen relative">
            {/* Titel */}
            <TextInput
                className="border-b border-neutral-300 px-4 py-3 placeholder:text-neutral-600 outline-none"
                placeholder="Titel"
                onChangeText={setTitle}
            />
            <View className="flex-row">
                <TextInput
                    className="w-1/2 border-b border-r border-neutral-300 border-r-neutral-200 px-4 py-3 placeholder:text-neutral-600 outline-none"
                    placeholder="Vak"
                    onChangeText={setSchoolSubject}
                />
                <TextInput
                    className="w-1/2 border-b border-neutral-300 px-4 py-3 placeholder:text-neutral-600 outline-none"
                    placeholder="Onderwerp"
                    onChangeText={setSubject}
                />
            </View>

            <TextInput
                className="h-32 border-b border-neutral-300 px-4 py-3 placeholder:text-neutral-600 outline-none"
                placeholder="Beschrijving" multiline={true}
                onChangeText={setDescription}
            />

            {/* Difficulty */}
            <View className="flex-row h-14 mb-4 border-b border-neutral-300">
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

            <TopTabs tabs={SOURCE_TYPES} state={[sourceType, setSourceType]} />

            {/* URL */}
            {
                sourceType !== 'book' && (
                    <TextInput
                        className="border-b border-neutral-300 px-4 py-3 placeholder:text-neutral-600 outline-none"
                        placeholder={ sourceType === 'video' ? 'youtube.com/...' : 'voorbeeld.com/...' }
                        onChangeText={setUrl}
                    />
                )
            }

            {/* ISBN */}
            {
                sourceType === 'book' && (
                    <TextInput
                        className="border-b border-neutral-300 px-4 py-3 placeholder:text-neutral-600 outline-none"
                        placeholder="ISBN"
                        onChangeText={setIsbn}
                    />
                )
            }
            {
                sourceType === 'book' && <ImagePicker state={[image, setImage]} />
            }

            <View className="w-full absolute bottom-0 bg-white">
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