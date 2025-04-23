import {Text, Image} from 'react-native';

function SourceContent({ name, image }) {
    return (
        <>
            <Text className="font-bold text-2xl text-rac">{ name }</Text>
            <Image
                className="mt-2 h-80"
                source={ image }
                resizeMode="contain"
                // height={500}
            />
        </>
    );
}

export default SourceContent;