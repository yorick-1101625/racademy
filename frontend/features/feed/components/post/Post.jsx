import {Image, Text, View} from 'react-native';

import PostMenu from "./PostMenu";
import PostContent from "./PostContent";
import PostDetails from "./PostDetails";
import PostActions from "./PostActions";
import PostAuthor from "./PostAuthor";

function Post({ post }) {


    return (
        <View className="my-5">

            <PostAuthor profilePicture={post.profilePicture} username={post.username} />

            <View className="bg-white mt-3 p-5 hover:shadow-md hover:shadow-neutral-200 transition-shadow rounded-lg relative cursor-pointer">
                <PostMenu isBookmarked={post.bookmarkedByCurrentUser} />

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