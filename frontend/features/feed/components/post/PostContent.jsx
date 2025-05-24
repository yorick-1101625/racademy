import {Text} from 'react-native';
import truncate from "@/features/feed/utils/truncate";

function PostContent({ content }) {
    return (
        <>
            <Text className="text-[1rem] text-gray-800">{ truncate(content, 1000) }</Text>
        </>
    );
}

export default PostContent;