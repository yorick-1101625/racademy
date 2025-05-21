import {useState} from "react";
import {View} from 'react-native';

import PostContent from "./PostContent";
import PostDetails from "./PostDetails";
import PostActions from "./PostActions";
import ContentAuthor from "../ContentAuthor";
import {Link} from "expo-router";
import fatty from "@/utils/fatty";

function Post({post}) {

    const [isBookmarked, setIsBookmarked] = useState(post['bookmarked_by_current_user']);

    function handleBookmark() {

        fatty('/api/user/', 'PATCH', {bookmarked_post: post.id})
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
            <Link href={`/posts/${post.id}`}>
                <PostContent title={post.title} content={post.content}/>
            </Link>

            <View className="flex-row justify-between">
                {/* Timestamp */}
                <PostDetails createdAt={post['created_at']} tags={post.tags}/>

                {/* Interaction buttons */}
                <PostActions numberOfComments={post['number_of_comments']} numberOfLikes={post['number_of_likes']}
                             likedByCurrentUser={post['liked_by_current_user']} postId={post.id}
                             handleBookmark={handleBookmark} isBookmarked={isBookmarked}
                />
            </View>
        </View>
    );
}

export default Post;