import React, {useState} from "react";
import {Pressable, Text, View} from 'react-native';

import PostContent from "./PostContent";
import PostDetails from "./PostDetails";
import PostActions from "./PostActions";
import ContentAuthor from "../ContentAuthor";
import {Link} from "expo-router";
import fatty from "@/utils/fatty";
import {showError, showSuccess} from "@/utils/toast";
import Kebab from "@/components/Kebab";
import {Feather, Ionicons} from "@expo/vector-icons";
import useUser from "@/hooks/useUser";
import BottomModal from "@/components/BottomModal";
import {openURL} from "expo-linking";

function Post({post}) {

    const {user} = useUser();
    const [isBookmarked, setIsBookmarked] = useState(post['bookmarked_by_current_user']);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    function handleBookmark() {

        fatty('/api/user/', 'PATCH', {bookmarked_post: post.id})
            .then(data => {
                if (data.success) {
                    setIsBookmarked(i => !i);
                }
                else {
                    console.error(data.message)
                    showError("Kon niet toevoegen aan favorieten");
                }
            })
    }

    function handleDelete() {

        fatty(`/api/post/${post.id}`, 'DELETE', {id: post.id})
            .then(data => {
                if (data.success) {
                    showSuccess("Post is verwijderd")
                } else if (!data.success) {
                    showError("Er ging iets mis")
                }
                setDeleteModalVisible(false);
            });
    }

    return (
        <View className="w-full bg-white p-4 border-t border-gray-200">

            {/* Header */}
            <ContentAuthor
                profilePicture={post.user['profile_picture']}
                username={post.user.username}
                email={post.user.email}
                userId={post.user.id}
            />

            {/* Content */}
            <Link href={`/posts/${post.id}`}>
                <PostContent content={post.content}/>
            </Link>

            <View className="flex-row justify-between items-center py-2">
                <Link href={`/posts/${post.id}`} className="flex-1">
                    {/* Timestamp */}
                    <PostDetails createdAt={post['created_at']} tags={post.tags}/>
                </Link>

                {/* Interaction buttons */}
                <PostActions
                    numberOfComments={post['number_of_comments']} numberOfLikes={post['number_of_likes']}
                    likedByCurrentUser={post['liked_by_current_user']} postId={post.id}
                    handleBookmark={handleBookmark} isBookmarked={isBookmarked}
                />
            </View>

            {
                post.user.id === user.id
                    ?   <Kebab>
                            <Link
                                href={`/create/post?id=${post.id}`}
                                className="flex-row rounded-md p-3 items-center hover:bg-blue-50 box-border transition-colors"
                            >
                                <Feather name="edit-2" color="#3daad3" size={18} />
                                <Text className="ml-3 text-rac text-base">Bewerken</Text>
                            </Link>
                            <Pressable
                                className="flex-row rounded-md p-3 items-center hover:bg-red-100 box-border transition-colors"
                                onPress={() => setDeleteModalVisible(true)}
                            >
                                <Ionicons name="trash-bin" color="red" size={18} />
                                <Text className="ml-3 text-red-600 text-base">Verwijderen</Text>
                            </Pressable>
                        </Kebab>
                    :   null
            }

            <BottomModal state={[deleteModalVisible, setDeleteModalVisible]}>
                <View className="items-center mb-4">
                    <Ionicons name="trash-bin" size={64} color="#EF4444"/>
                </View>

                <Text className="text-lg font-semibold mb-6 text-center text-black">
                    Weet je zeker dat je deze post wilt verwijderen?
                </Text>

                <View className="flex-row justify-between space-x-3">
                    <Pressable
                        onPress={() => setDeleteModalVisible(false)}
                        className="flex-1 py-3 bg-gray-200 rounded-md"
                    >
                        <Text className="text-center text-black font-semibold">Annuleren</Text>
                    </Pressable>

                    <Pressable
                        onPress={handleDelete}
                        className="flex-1 py-3 bg-red-600 rounded-md"
                    >
                        <Text className="text-center text-white font-semibold">Verwijderen</Text>
                    </Pressable>
                </View>
            </BottomModal>
        </View>
    );
}

export default Post;