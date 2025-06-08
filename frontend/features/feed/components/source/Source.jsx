import {Pressable, Text, View} from 'react-native';
import React, {useState} from "react";
import ContentAuthor from "../ContentAuthor";
import SourceContent from "./SourceContent";
import SourceDetails from "./SourceDetails";

import calculateAverageRating from "@/features/feed/utils/calculateAverageRating";
import fatty from "@/utils/fatty";
import {Link, router} from "expo-router";
import Kebab from "@/components/Kebab";
import {Feather, Ionicons} from "@expo/vector-icons";
import useUser from "@/hooks/useUser";
import BottomModal from "@/components/BottomModal";
import {showError, showSuccess} from "@/utils/toast";
import truncate from "@/features/feed/utils/truncate";


function Source({source, shorten=true}) {

    const [isBookmarked, setIsBookmarked] = useState(source['bookmarked_by_current_user']);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const {user} = useUser();

    function handleBookmark() {

        fatty('/api/user/', 'PATCH', {bookmarked_source: source.id})
            .then(data => {
                if (data.success) {
                    setIsBookmarked(i => !i);
                }
            });
    }

    function handleDelete() {

        fatty(`/api/source/${source.id}`, 'DELETE', {id: source.id})
            .then(data => {
                if (data.success) {
                    showSuccess("Bron is verwijderd")
                    router.push('/sources?refresh=1');
                } else if (!data.success) {
                    showError("Er ging iets mis")
                }
                setDeleteModalVisible(false);

            });
    }

    return (
        <View className="w-full bg-white p-4 border-t border-gray-200 relative">
            {/* Header */}
            <ContentAuthor
                profilePicture={source.user['profile_picture']}
                username={source.user.username}
                email={source.user.email}
                userId={source.user.id}
            />

            {/* Content */}
            <SourceContent
                sourceId={source.id}
                difficulty={source.difficulty}
                title={
                    shorten
                        ?   truncate(source.title, 70)
                        :   source.title
                }
                image={source.image}
                type={source.type}
                url={source.url}
                description={
                    shorten
                        ?   truncate(source.description, 60)
                        :   source.description
                }

            />

            {/* Timestamp */}
            <SourceDetails
                sourceId={source.id}
                createdAt={source['created_at']}
                schoolSubject={source['school_subject']}
                subject={source.subject}
                ratings={source.ratings}
                handleBookmark={handleBookmark}
                isBookmarked={isBookmarked}
                currentRating={source['current_rating']}
            />

            {
                source.user.id === user.id || user.is_admin
                    ?   <Kebab>
                        {
                            source.user.id === user.id &&
                            <Pressable
                                onPress={() => router.push(`/create/source?id=${source.id}`)}
                                className="flex-row rounded-md p-3 items-center hover:bg-blue-50 box-border transition-colors"
                            >
                                <Feather name="edit-2" color="#3daad3" size={18} />
                                <Text className="ml-3 text-rac text-base">Bewerken</Text>
                            </Pressable>
                        }
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

            {/* Delete Modal */}
             <BottomModal state={[deleteModalVisible, setDeleteModalVisible]}>
                <View className="items-center mb-4">
                    <Ionicons name="trash-bin" size={64} color="#EF4444"/>
                </View>

                <Text className="text-lg font-semibold mb-6 text-center text-black">
                    Weet je zeker dat je deze bron wilt verwijderen?
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

export default Source;