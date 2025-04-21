import {Image, Text, View} from 'react-native';
import calculateTimeFromToday from "@/features/feed/utils/calculateTimeFromToday";

// Icons
import Rating00Icon from "@/assets/icons/rating/rating-00.png";
import Rating05Icon from "@/assets/icons/rating/rating-05.png";
import Rating10Icon from "@/assets/icons/rating/rating-10.png";
import Rating15Icon from "@/assets/icons/rating/rating-15.png";
import Rating20Icon from "@/assets/icons/rating/rating-20.png";
import Rating25Icon from "@/assets/icons/rating/rating-25.png";
import Rating30Icon from "@/assets/icons/rating/rating-30.png";
import Rating35Icon from "@/assets/icons/rating/rating-35.png";
import Rating40Icon from "@/assets/icons/rating/rating-40.png";
import Rating45Icon from "@/assets/icons/rating/rating-45.png";
import Rating50Icon from "@/assets/icons/rating/rating-50.png";

function getRatingIcon(rating) {
    if (rating === 0) {
        return Rating00Icon;
    }
    if (rating === 5) {
        return Rating05Icon;
    }
    if (rating === 10) {
        return Rating10Icon;
    }
    if (rating === 15) {
        return Rating15Icon;
    }
    if (rating === 20) {
        return Rating20Icon;
    }
    if (rating === 25) {
        return Rating25Icon;
    }
    if (rating === 30) {
        return Rating30Icon;
    }
    if (rating === 35) {
        return Rating35Icon;
    }
    if (rating === 40) {
        return Rating40Icon;
    }
    if (rating === 45) {
        return Rating45Icon;
    }
    if (rating === 50) {
        return Rating50Icon;
    }
}

function SourceDetails({ createdAt, schoolSubject, subject, rating }) {



    return (
        <>
            <View>
                <Text className="italic text-neutral-600">{ calculateTimeFromToday(createdAt) }</Text>
                <Text className="italic text-neutral-600">{ schoolSubject }: { subject }</Text>
            </View>

            <View className="flex-row items-center">
                <Text className="mr-1">{ (rating / 10).toFixed(1) }</Text>
                <Image source={
                    getRatingIcon(rating)
                } />
            </View>
        </>
    );
}

export default SourceDetails;