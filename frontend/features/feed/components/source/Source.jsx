import {View} from 'react-native';
import {useState} from "react";
import {Link} from "expo-router";

import ContentAuthor from "../ContentAuthor";
import ContentMenu from "../ContentMenu";
import SourceContent from "./SourceContent";
import SourceDetails from "./SourceDetails";

import calculateAverageRating from "@/features/feed/utils/calculateAverageRating";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userId = 1; // TODO: get from session
function Source({source}) {

    const [isBookmarked, setIsBookmarked] = useState(source['bookmarked_by_current_user']);

    function handleBookmark() {

        AsyncStorage.getItem('token')
            .then(token => {
                return fetch(`http://127.0.0.1:5000/api/user/${userId}`, {
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
        <View className="my-5">
            <ContentAuthor
                profilePicture={source.user['profile_picture']}
                username={source.user.username}
                userId={source.user.id}
            />

            <View
                className="bg-white border border-neutral-200 mt-3 p-5 hover:shadow-md hover:shadow-neutral-200 transition-shadow rounded-lg relative cursor-pointer">
                <Link href={`/sources/${source.id}`} className="absolute left-0 top-0 bottom-0 right-32 z-10"/>

                <ContentMenu handleBookmark={handleBookmark} isBookmarked={isBookmarked}/>

                <SourceContent title={source.title} image={source.image} type={source.type} url={source.url}/>

                <View className="mt-4 flex-row justify-between items-end">
                    <SourceDetails
                        createdAt={source['created_at']}
                        schoolSubject={source['school_subject']}
                        subject={source.subject}
                        rating={averageRating}
                    />
                </View>
            </View>
        </View>
    );
}

export default Source;