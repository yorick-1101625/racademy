import {useState} from "react";
import {View} from 'react-native';
import {Link} from "expo-router";

import ContentMenu from "../ContentMenu";
import PostContent from "./PostContent";
import PostDetails from "./PostDetails";
import PostActions from "./PostActions";
import ContentAuthor from "../ContentAuthor";

function Post({ post }) {

    const [isBookmarked, setIsBookmarked] = useState(post.bookmarkedByCurrentUser);

    function handleBookmark() {

        setIsBookmarked(i => !i);
    }

    return (
        <View className="my-5">

            <ContentAuthor profilePicture={post.user.profilePicture} username={post.user.username} userId={post.user.id} />

            <View className="bg-white border border-neutral-200 mt-3 p-5 hover:shadow-md hover:shadow-neutral-200 transition-shadow rounded-lg relative cursor-pointer">
                <Link href={`/posts/${post.id}`} className="absolute left-0 top-0 bottom-0 right-32 z-10" />

                <ContentMenu handleBookmark={handleBookmark} isBookmarked={isBookmarked} />

                <PostContent title={post.title} content={post.content} />

                <View className="mt-4 flex-row justify-between items-end">
                    <PostDetails createdAt={post.created_at} tags={post.tags} />

                    <PostActions numberOfComments={post.number_of_comments} numberOfLikes={post.number_of_likes} likedByCurrentUser={post.likedByCurrentUser} postId={post.id} />
                </View>
            </View>

        </View>
    );
}

export default Post;