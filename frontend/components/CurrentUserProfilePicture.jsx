import {Image, Text, View} from 'react-native';
import useUser from "@/hooks/useUser";

function CurrentUserProfilePicture({ className, alt = "profielfoto" }) {

    const { user, authChecked } = useUser();

    return (

        user && <Image
            source={{
                uri: `http://localhost:5000/${ user['profile_picture'] }`
            }}
            className={className}
            alt={alt}
        />
    );
}

export default CurrentUserProfilePicture;