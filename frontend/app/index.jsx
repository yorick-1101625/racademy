import {SafeAreaView, Text} from 'react-native';

import PostList from "../features/feed/components/PostList";
import {useState} from "react";
import SectionMenu from "../features/feed/components/SectionMenu";

function Home() {

    const [selectedSection, setSelectedSection] = useState('posts');

    function handleSwitchSection(section) {
        setSelectedSection(section);
    }

    return (
        <SafeAreaView className="flex-1 items-center bg-neutral-100">

            <SectionMenu handleSwitchSection={handleSwitchSection} />

            {
                selectedSection === 'posts'
                    ? <PostList />
                    : <Text>Bronnen</Text>
            }

        </SafeAreaView>
    );
}

export default Home;