import {Image, Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import TopTabs from "@/components/TopTabs";
import ImagePicker from "@/components/ImagePicker";
import {Ionicons} from "@expo/vector-icons";
import fatty from "@/utils/fatty";
import {showError, showSuccess} from "@/utils/toast";
import {isISBN} from "@/utils/validators";
import ContentAuthor from "@/features/feed/components/ContentAuthor";
import useUser from "@/hooks/useUser";
import CreateSourceContent from "@/features/create/source/CreateSourceContent";
import truncate from "@/features/feed/utils/truncate";
import FocusableImage from "@/components/FocusableImage";
import {BASE_URL} from "@/utils/url";
import MultilineTextInput from "@/components/MultilineTextInput";

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
        if (!(title.trim())) {showError('Titel is verplicht.'); return;}
        if (!(schoolSubject.trim())) {showError('Vak is verplicht.'); return;}
        if (!(subject.trim())) {showError('Onderwerp is verplicht.'); return;}
        if (!(description.trim())) {showError('Beschrijving is verplicht.'); return;}
        if (!(difficulty.trim())) {showError('Moeilijkheid is verplicht.'); return;}
        if (!(type.trim())) {showError('Brontype is verplicht.'); return;}
        if (type !== 'book' && !(url.trim())) {showError('URL is verplicht.'); return;}
        if (type === 'book' && !(isbn.trim())) {showError('ISBN is verplicht'); return;}
        if (type === 'book' && !isISBN(isbn)) {showError('ISBN is niet geldig.'); return;}
        if (type === 'book' && !image) {showError('Foto is verplicht bij boeken.'); return;}
        if (image && image.type !== 'image') {showError('Bestand moet een foto zijn.'); return;}
        if (type === 'video' && url.slice(0, 23) !== 'https://www.youtube.com') {
            showError('URL moet op https://www.youtube.com/.... lijken'); return;
        }
        const imageData = ( image ? {
            base64: image.base64,
            'mime_type': image.mimeType,
        } : null );

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
        <SafeAreaView className="flex-1 h-screen relative bg-white">

            <TopTabs tabs={SOURCE_TYPES} state={[type, setType]} />

            <View className="w-full p-4 border-b border-gray-200">
                <ContentAuthor profilePicture={user['profile_picture']} username={user.username} email={user.email} userId={user.id}/>

                <View className="px-2">
                {
                    type === "video" && (
                        <>
                            <TextInput
                                className="font-semibold text-lg placeholder:text-neutral-500 placeholder:font-normal px-1"
                                placeholder="Titel"
                                onChangeText={setTitle}
                            />
                            <TextInput
                                className="placeholder:text-neutral-500 p-1"
                                placeholder="https://www.youtube.com/..."
                            />
                            {
                                url &&
                                <View className="relative min-h-40 max-h-96 max-w-2xl aspect-video z-50">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${url.split('v=')[1]}`}
                                        title={title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen={true}
                                        className="absolute top-0 left-0 bottom-0 right-0 rounded-md"
                                    />
                                </View>
                            }
                            <TextInput
                                className="placeholder:text-gray-500 text-s mt-2 h-auto p-1"
                                placeholder="Bescrijving"
                                multiline={true}
                                numberOfLines={0}
                            />
                            {/*TODO*/}
                            <MultilineTextInput />
                        </>
                    )
                }

                {
                    type === "link" && (
                        <View className="max-w-2xl border border-gray-200 rounded-md overflow-hidden">
                            <View className="p-3">
                                <TextInput className="font-medium mt-1 placeholder:text-neutral-500" placeholder="Titel" />
                                <TextInput className="text-gray-500 text-xs" placeholder="URL"/>
                                {
                                    image &&
                                    <View className="mt-2">
                                        <Image
                                            className="w-full h-20 rounded"
                                            source={image}
                                            resizeMode="cover"
                                        />
                                    </View>
                                }
                                <TextInput className="text-gray-500 text-s mt-2" placeholder="Beschrijving" />
                            </View>
                        </View>
                    )
                }

                {
                    type === "book" && (
                        <>
                            <TextInput placeholder="Titel"/>
                            <ImagePicker className="px-4 mt-2 aspect-square max-h-96 w-full max-w-2xl border border-gray-200 rounded-md" state={[image, setImage]} />
                            {/*<FocusableImage*/}
                            {/*    className="px-4 mt-2 aspect-square max-h-96 w-full max-w-2xl border border-gray-200 rounded-md"*/}
                            {/*    source={{ uri: `${BASE_URL}${image}`}}*/}
                            {/*    resizeMode="contain"*/}
                            {/*/>*/}
                        </>
                    )
                }
                </View>
            </View>

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



            {/* URL */}
            {
                type !== 'book' && (
                    <TextInput
                        className="border-b border-neutral-200 px-4 py-3 placeholder:text-neutral-600 outline-none"
                        placeholder={ type === 'video' ? 'https://www.youtube.com/...' : 'https://www.voorbeeld.com/...' }
                        onChangeText={setUrl}
                    />
                )
            }

            {/* ISBN */}
            {
                type === 'book' && (
                    <TextInput
                        className="border-b border-neutral-200 px-4 py-3 placeholder:text-neutral-600 outline-none"
                        placeholder="ISBN"
                        onChangeText={setIsbn}
                    />
                )
            }
            {
                type !== 'video' ? <ImagePicker state={[image, setImage]} /> : <View className="flex-1" />
            }

            <View className="flex-1" />

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