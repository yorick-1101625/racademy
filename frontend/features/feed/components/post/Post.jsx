import {useState} from "react";
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Link} from "expo-router";

import Card from "@/components/Card";
import ContentMenu from "../ContentMenu";
import PostContent from "./PostContent";
import PostDetails from "./PostDetails";
import PostActions from "./PostActions";
import ContentAuthor from "../ContentAuthor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Feather, FontAwesome} from "@expo/vector-icons";

const userId = 1; // TODO: use session variables in server

function Post({post}) {

    const [isBookmarked, setIsBookmarked] = useState(post['bookmarked_by_current_user']);

    function handleBookmark() {

        AsyncStorage.getItem('token')
            .then(token => {
                return fetch(`http://127.0.0.1:5000/api/user/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,

                    },
                    body: JSON.stringify({bookmarked_post: post.id})
                });
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setIsBookmarked(i => !i);
                }
            })
    }

    return (
        <View className="w-full bg-white p-4 border-t border-gray-200">

            {/* Header */}
            <ContentAuthor profilePicture={post.user['profile_picture']}
                           username={post.user.username}
                           email={post.user.email}
                           userId={post.user.id}
            />

            {/* Content */}
            <PostContent title={post.title} content={post.content}/>

            {/* Timestamp */}
            <PostDetails createdAt={post['created_at']} tags={post.tags}/>

            {/* Interaction buttons */}
            <PostActions numberOfComments={post['number_of_comments']} numberOfLikes={post['number_of_likes']}
                         likedByCurrentUser={post['liked_by_current_user']} postId={post.id}
                         handleBookmark={handleBookmark} isBookmarked={isBookmarked}
            />


            {/*<Card>*/}
            {/*    <Link href={`/posts/${post.id}`} className=""/>*/}

            {/*<ContentMenu handleBookmark={handleBookmark} isBookmarked={isBookmarked}/>*/}

            {/*    <PostContent title={post.title} content={post.content}/>*/}

            {/*    <View className="">*/}
            {/*        <PostDetails createdAt={post['created_at']} tags={post.tags}/>*/}

            {/*        <PostActions numberOfComments={post['number_of_comments']} numberOfLikes={post['number_of_likes']}*/}
            {/*                     likedByCurrentUser={post['liked_by_current_user']} postId={post.id}/>*/}
            {/*    </View>*/}
            {/*</Card>*/}

        </View>
    );
}

export default Post;