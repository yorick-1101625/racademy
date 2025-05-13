import {Image} from 'react-native';
import useUser from "@/hooks/useUser";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

function CurrentUserProfilePicture({ className, alt = "profielfoto" }) {

    const { user } = useUser();

    return (

        user && <Image
            source={{
                uri: `${backendUrl}${ user['profile_picture'] }`
            }}
            className={className}
            alt={alt}
        />
    );
}

export default CurrentUserProfilePicture;