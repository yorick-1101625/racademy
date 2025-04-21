import {Text} from 'react-native';

function PostContent({ title, content }) {
    return (
        <>
            <Text className="font-bold text-2xl text-rac">{ title }</Text>
            <Text className="mt-2 p-1 text-neutral-800">
                { content }
            </Text>
        </>
    );
}

export default PostContent;