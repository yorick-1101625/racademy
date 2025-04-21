import {Pressable, Text, View} from 'react-native';
import PostList from "./content/post/PostList";
import {useState} from "react";
import SourceList from "./content/source/SourceList";

function Feed() {

    const [selectedSection, setSelectedSection] = useState('posts');

    function handleSwitchSection(section) {
        setSelectedSection(section);
    }

    return (
        <>
            <View className="relative flex-row w-full sm:max-w-xl items-center border-b border-neutral-300 bg-neutral-50">

                <Pressable
                    className={`py-5 ${ selectedSection === 'posts' && 'border-b'} flex-1 items-center hover:bg-neutral-200 transition-all`}
                    onPress={() => handleSwitchSection('posts')}
                >
                    <Text className="text-lg font-semibold">Posts</Text>
                </Pressable>
                <Pressable
                    className={`py-5 ${ selectedSection === 'sources' && 'border-b'} flex-1 items-center hover:bg-neutral-200 transition-all`}
                    onPress={() => handleSwitchSection('sources')}
                >
                    <Text className="text-lg font-semibold">Bronnen</Text>
                </Pressable>

            </View>

            {
                selectedSection === 'posts'
                    ? <PostList />
                    : <SourceList />
            }
        </>
    );
}

export default Feed;