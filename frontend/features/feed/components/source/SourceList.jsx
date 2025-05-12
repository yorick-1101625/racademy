import {ActivityIndicator, FlatList, Text} from 'react-native';
import Source from './Source.jsx';
import useFetch from "@/hooks/useFetch";

const TestPFP = {uri: 'https://placehold.co/64'};
const TestImage = {uri: 'https://img.youtube.com/vi/P9-4xHVc7uk/0.jpg'};

const testSources = [{
    id: 1,
    profilePicture: TestPFP,
    username: "Supercoolegast",
    userId: 3,
    type: "youtube",
    url: "https://www.google.com",
    isbn: null,
    name: "Leer javascript in 1 seconde",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla",
    createdAt: "2025-04-20 15:10:00.182740",
    schoolSubject: "Werkplaats",
    subject: "OOP",
    difficulty: "easy",
    bookmarkedByCurrentUser: false,
    rating: 45,
    image: TestImage
},{
    id: 2,
    profilePicture: TestPFP,
    username: "Supercoolegast",
    userId: 3,
    type: "youtube",
    url: "https://www.google.com",
    isbn: null,
    name: "Leer javascript in 1 seconde",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla",
    createdAt: "2025-04-20 15:10:00.182740",
    schoolSubject: "Werkplaats",
    subject: "OOP",
    difficulty: "easy",
    bookmarkedByCurrentUser: false,
    rating: 30,
    image: TestImage
}
];

function SourceList() {

    const {data: sources, isPending, error} = useFetch('http://127.0.0.1:5000/api/source/');

    return (
        <>
            { isPending && <ActivityIndicator />}
            { error && <Text>Error!</Text>}
            {
                sources && <FlatList
                    data={ sources }
                    renderItem={({item}) => <Source source={item}/>}
                    keyExtractor={source => source.id}
                />
            }
        </>
    );
}

export default SourceList;