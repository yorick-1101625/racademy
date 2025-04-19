import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';

const TestPFP = {uri: 'https://placehold.co/256'};

import Post from "../features/feed/components/Post";

const post = {
    profilePicture: TestPFP,
    username: "Supercoolegast",
    title: "Javascript Cursus",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla",
    createdAt: "2025-04-16 21:37:59.182740",
    tags: ["#programmeren", "#javascript"],
    numberOfLikes: 26,
    likedByCurrentUser: false
}

function Home() {
    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-neutral-100">

            {/*<FlatList>*/}
            {/*</FlatList>*/}

            <Post post={post} />

        </SafeAreaView>
    );
}

export default Home;