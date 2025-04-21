import {View} from 'react-native';

import ContentMenu from "../ContentMenu";
import PostContent from "./PostContent";
import PostDetails from "./PostDetails";
import PostActions from "./PostActions";
import ContentAuthor from "../ContentAuthor";
import {Link} from "expo-router";
import {useState} from "react";

function Post({ post }) {

    const [isBookmarked, setIsBookmarked] = useState(post.bookmarkedByCurrentUser);

    function handleBookmark() {

        setIsBookmarked(i => !i);
    }

    return (
        <View className="my-5">

            <ContentAuthor profilePicture={post.profilePicture} username={post.username} userId={post.userId} />

            <View className="bg-white border border-neutral-200 mt-3 p-5 hover:shadow-md hover:shadow-neutral-200 transition-shadow rounded-lg relative cursor-pointer">
                <Link href={`/posts/${post.id}`} className="absolute left-0 top-0 bottom-0 right-32 z-10" />

                <ContentMenu handleBookmark={handleBookmark} isBookmarked={isBookmarked} />

                <PostContent title={post.title} content={post.content} />

                <View className="mt-4 flex-row justify-between items-end">
                    <PostDetails createdAt={post.createdAt} tags={post.tags} />

                    <PostActions numberOfComments={post.numberOfComments} numberOfLikes={post.numberOfLikes} likedByCurrentUser={post.likedByCurrentUser} />
                </View>
            </View>

        </View>
    );
}

export default Post;