import {FlatList, Text} from 'react-native';
import Post from "./Post";
import useFetch from "@/hooks/useFetch";

const TestPFP = {uri: 'https://placehold.co/64'};

// #TODO Remove testPosts?
const testPosts = [{
    id: 1,
    profilePicture: TestPFP,
    username: "Supercoolegast",
    title: "Javascript Cursus",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla",
    createdAt: "2025-04-20 15:10:00.182740",
    tags: ["#programmeren", "#javascript"],
    numberOfLikes: 26,
    numberOfComments: 3,
    likedByCurrentUser: false,
    bookmarkedByCurrentUser: false,
    userId: 3
},{
    id: 2,
    profilePicture: TestPFP,
    username: "Supercoolegast",
    title: "Javascript Cursus",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla",
    createdAt: "2025-04-20 15:09:00.182740",
    tags: ["#programmeren", "#javascript"],
    numberOfLikes: 26,
    numberOfComments: 3,
    likedByCurrentUser: true,
    bookmarkedByCurrentUser: true,
    userId: 3
},{
    id: 3,
    profilePicture: TestPFP,
    username: "Supercoolegast",
    title: "Javascript Cursus",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla",
    createdAt: "2025-04-20 14:09:00.182740",
    tags: ["#programmeren", "#javascript"],
    numberOfLikes: 26,
    numberOfComments: 3,
    likedByCurrentUser: false,
    bookmarkedByCurrentUser: false,
    userId: 3
},{
    id: 4,
    profilePicture: TestPFP,
    username: "Supercoolegast",
    title: "Javascript Cursus",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla",
    createdAt: "2025-04-19 15:11:00.182740",
    tags: ["#programmeren", "#javascript"],
    numberOfLikes: 26,
    numberOfComments: 3,
    likedByCurrentUser: false,
    bookmarkedByCurrentUser: false,
    userId: 3
},{
    id: 5,
    profilePicture: TestPFP,
    username: "Supercoolegast",
    title: "Javascript Cursus",
    content: "velit esse cillum dolore eu fugiat nulla",
    createdAt: "2025-04-12 21:37:59.182740",
    tags: ["#programmeren", "#javascript"],
    numberOfLikes: 26,
    numberOfComments: 3,
    likedByCurrentUser: false,
    bookmarkedByCurrentUser: false,
    userId: 3
},{
    id: 6,
    profilePicture: TestPFP,
    username: "Supercoolegast",
    title: "Javascript Cursus",
    content: "velit esse cillum dolore eu fugiat nulla",
    createdAt: "2024-02-12 21:37:59.182740",
    tags: ["#programmeren", "#javascript"],
    numberOfLikes: 26,
    numberOfComments: 3,
    likedByCurrentUser: false,
    bookmarkedByCurrentUser: false,
    userId: 3
},
];

function PostList() {

    const {data: posts, isPending, error} = useFetch('http://127.0.0.1:5000/api/post/');

    return (
        <>
            { isPending && <Text>Loading...</Text>}
            { error && <Text>Error!</Text>}
            {
                posts && <FlatList
                    data={ posts }
                    renderItem={({item}) => <Post post={item}/>}
                    keyExtractor={post => post.id}
                />
            }
        </>
    );
}

export default PostList;