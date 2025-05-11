import {Image, Text, View} from 'react-native';
import useUser from "@/hooks/useUser";

function CurrentUserProfilePicture({ className, alt = "profielfoto" }) {

    const {user} = useUser();

    const profilePicturePath = `http://localhost:5000/${ user['profile_picture'] }`;
    return (
        <Image
            source={{
                uri: profilePicturePath
            }}
            className={className}
            alt={alt}
        />
    );
}

export default CurrentUserProfilePicture;