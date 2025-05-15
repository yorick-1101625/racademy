import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import TopTabs from "@/components/TopTabs";

const SOURCE_TYPES = [
    {value: 'video', label: 'Video'},
    {value: 'book', label: 'Boek'},
    {value: 'article', label: 'Artikel'},
    {value: 'course', label: 'Cursus'}
]

const DIFFICULTIES = [
    {value: 'easy', label: 'Makkelijk'},
    {value: 'medium', label: 'Gemiddeld'},
    {value: 'hard', label: 'Moeilijk'},
    {value: 'extra_hard', label: 'Heel Moeilijk'}
]



function CreateSource() {

    const [sourceType, setSourceType] = useState('video');
    const [difficulty, setDifficulty] = useState('easy');

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row">
                <TextInput
                    className="w-1/2 border-b border-r border-neutral-300 px-4 py-3 placeholder:text-neutral-600 outline-none"
                    placeholder="Vak"
                />
                <TextInput
                    className="w-1/2 border-b border-neutral-300 px-4 py-3 placeholder:text-neutral-600 outline-none"
                    placeholder="Onderwerp"
                />
            </View>

            <TextInput
                className="h-32 border-b border-neutral-300 px-4 py-3 placeholder:text-neutral-600 outline-none"
                placeholder="Beschrijving" multiline={true}
            />

            {/* Difficulty */}
            <View className="flex-row h-14 mb-4 border-b border-neutral-300">
                {
                    DIFFICULTIES.map(item => (
                        <Pressable
                            className={`flex-1 justify-center items-center transition-colors duration-75 ${difficulty === item.value && 'bg-rac rounded-md'}`}
                            onPress={() => setDifficulty(item.value)}
                        >
                            <Text className={`text-[0.9rem] transition-colors duration-75 ${difficulty === item.value ? 'text-white' : 'text-gray'} `}>{item.label}</Text>
                        </Pressable>
                    ))
                }
            </View>

            <TopTabs tabs={SOURCE_TYPES} state={[sourceType, setSourceType]} />

            <View className="flex-1 bg-neutral-100">
            {/* Titel */}
            {
                sourceType !== 'video' && (
                    <TextInput
                        className="border-b border-neutral-300 px-4 py-3 placeholder:text-neutral-600 outline-none"
                        placeholder="Titel"
                    />
                )
            }

            {/* ISBN */}
            {
                sourceType === 'book' && (
                    <TextInput
                        className="border-b border-neutral-300 px-4 py-3 placeholder:text-neutral-600 outline-none"
                        placeholder="ISBN"
                    />
                )
            }

            {/* URL */}
            {
                sourceType !== 'book' && (
                    <TextInput
                        className="border-b border-neutral-300 px-4 py-3 placeholder:text-neutral-600 outline-none"
                        placeholder={ sourceType === 'video' ? 'youtube.com/...' : 'voorbeeld.com/...' }
                    />
                )
            }
            </View>



        </SafeAreaView>
    );
}

export default CreateSource;