import {View} from 'react-native';
import {useState} from "react";
import ContentAuthor from "../ContentAuthor";
import SourceContent from "./SourceContent";
import SourceDetails from "./SourceDetails";

import calculateAverageRating from "@/features/content/utils/calculateAverageRating";
import fatty from "@/utils/fatty";

function Source({source}) {

    const [isBookmarked, setIsBookmarked] = useState(source['bookmarked_by_current_user']);

    function handleBookmark() {

        fatty('/api/user/', 'PATCH', {bookmarked_source: source.id})
            .then(data => {
                if (data.success) {
                    setIsBookmarked(i => !i);
                }
            });
    }

    const averageRating = calculateAverageRating(source.ratings);
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
                title={source.title}
                image={source.image}
                type={source.type}
                url={source.url}
                description={source.description}
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

        </View>
    );
}

export default Source;