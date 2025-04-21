import {Image, Text, View} from 'react-native';

import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";
import formatRating from "@/features/feed/utils/formatRating";
import getRatingIcon from "@/features/feed/utils/getRatingIcon";

function SourceDetails({ createdAt, schoolSubject, subject, rating }) {

    return (
        <>
            <View>
                <Text className="italic text-neutral-600">{ calculateTimeFromToday(createdAt) }</Text>
                <Text className="italic text-neutral-600">{ schoolSubject }: { subject }</Text>
            </View>

            <View className="flex-row items-center">
                <Text className="mr-1">{ formatRating(rating) }</Text>
                <Image source={ getRatingIcon(rating) } />
            </View>
        </>
    );
}

export default SourceDetails;