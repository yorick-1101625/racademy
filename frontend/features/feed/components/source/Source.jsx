import {View} from 'react-native';
import {useState} from "react";
import {Link} from "expo-router";

import ContentAuthor from "../ContentAuthor";
import ContentMenu from "../ContentMenu";
import SourceContent from "./SourceContent";
import SourceDetails from "./SourceDetails";

function Source({ source }) {

    const [isBookmarked, setIsBookmarked] = useState(source.bookmarkedByCurrentUser);

    function handleBookmark() {

        setIsBookmarked(i => !i);
    }

    return (
        <View className="my-5">

            <ContentAuthor profilePicture={source.profilePicture} username={source.username} userId={source.userId} />

            <View className="bg-white border border-neutral-200 mt-3 p-5 hover:shadow-md hover:shadow-neutral-200 transition-shadow rounded-lg relative cursor-pointer">
                <Link href={`/sources/${source.id}`} className="absolute left-0 top-0 bottom-0 right-32 z-10" />

                <ContentMenu handleBookmark={handleBookmark} isBookmarked={isBookmarked} />

                <SourceContent name={source.name} image={source.image} type={source.type} />

                <View className="mt-4 flex-row justify-between items-end">
                    <SourceDetails createdAt={source.createdAt} schoolSubject={source.schoolSubject} subject={source.subject} rating={source.rating} />
                </View>
            </View>

        </View>
    );
}

export default Source;