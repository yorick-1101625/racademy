import {Image} from 'react-native';
import useUser from "@/hooks/useUser";
import {BASE_URL} from "@/utils/url";

function CurrentUserProfilePicture({ className, alt = "profielfoto" }) {

    const { user } = useUser();

    return (

        user && <Image
            source={{
                uri: `${BASE_URL}${ user['profile_picture'] }`
            }}
            className={className}
            alt={alt}
        />
    );
}

export default CurrentUserProfilePicture;