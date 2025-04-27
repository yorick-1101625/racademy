import {Text, Image} from 'react-native';

function SourceContent({ title, image }) {
    return (
        <>
            <Text className="font-bold text-2xl text-rac">{ title }</Text>
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