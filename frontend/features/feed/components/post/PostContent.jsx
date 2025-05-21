import {Text} from 'react-native';
import truncate from "@/features/feed/utils/truncate";

function PostContent({ title, content }) {
    return (
        <>
            <Text className="text-[15px] text-gray-800">{ truncate(content, 1000) }</Text>
        </>
    );
}

export default PostContent;