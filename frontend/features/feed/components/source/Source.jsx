import {View} from 'react-native';
import {useState} from "react";
import ContentAuthor from "../ContentAuthor";
import SourceContent from "./SourceContent";
import SourceDetails from "./SourceDetails";

import calculateAverageRating from "@/features/feed/utils/calculateAverageRating";
import AsyncStorage from "@react-native-async-storage/async-storage";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

function Source({source}) {

    const [isBookmarked, setIsBookmarked] = useState(source['bookmarked_by_current_user']);

    function handleBookmark() {

        AsyncStorage.getItem('token')
            .then(token => {
                return fetch(`${backendUrl}/api/user/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({bookmarked_source: source.id})
                });
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setIsBookmarked(i => !i);
                }
            })
    }

    const averageRating = calculateAverageRating(source.ratings);
    return (
        <View className="w-full bg-white p-4 border-t border-gray-200">

            {/* Header */}
            <ContentAuthor
                profilePicture={source.user['profile_picture']}
                username={source.user.username}
                email={source.user.email}
                userId={source.user.id}
            />

            {/* Content */}
            <SourceContent
                title={source.title}
                image={source.image}
                type={source.type}
                url={source.url}
            />

            {/* Timestamp */}
            <SourceDetails
                createdAt={source['created_at']}
                schoolSubject={source['school_subject']}
                subject={source.subject}
                rating={averageRating}
                handleBookmark={handleBookmark}
                isBookmarked={isBookmarked}
            />

            {/*<ContentMenu handleBookmark={handleBookmark} isBookmarked={isBookmarked}/>*/}

        </View>
    );
}

export default Source;