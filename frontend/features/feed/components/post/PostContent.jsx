import {Text} from 'react-native';

function PostContent({ title, content }) {
    return (
        <>
            <Text className="text-[15px] text-gray-800">{ content }</Text>
        </>
    );
}

export default PostContent;