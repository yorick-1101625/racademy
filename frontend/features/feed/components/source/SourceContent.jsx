import {Text, Image, View, Pressable} from 'react-native';
import {Linking} from 'react-native';
import {BASE_URL} from "@/utils/url";
import truncate from "@/features/feed/utils/truncate";
import YoutubePlayer from 'react-native-youtube-iframe';
import {useMemo} from "react";
import FocusableImage from "@/components/FocusableImage";

function SourceContent({title, image, type, url, description}) {

    const videoId = useMemo(() => {
        if (!url) return null;
        const match = url.match(/v=([^&]+)/);
        return match ? match[1] : null;
    }, [url]);


    return (
        <View>
            {
                type === "video" &&
                    <>
                        <View className="
                            relative min-h-40 max-h-96 max-w-2xl aspect-video z-50 rounded-md overflow-hidden
                        ">
                            <YoutubePlayer
                                height="100%"
                                width="100%"
                                videoId={videoId}
                                play={false}
                                webViewProps={{
                                    allowsFullscreenVideo: true,
                                    allowsInlineMediaPlayback: true,
                                }}
                            />
                        </View>
                         {/*<Text className="font-semibold text-md text-neutral-900">{ title }</Text>*/}
                        <Text className="text-gray-500 text-s mt-2">{ truncate(description, 110) }</Text>
                    </>
            }

            {
                type === "article" && (
                    <Pressable
                        className="max-w-2xl border border-gray-200 rounded-md overflow-hidden"
                        onPress={() => {
                            Linking.canOpenURL(url).then(canOpen => canOpen && Linking.openURL(url));
                        }}
                    >
                        <View className="p-3">
                            <Text className="text-black font-medium" numberOfLines={2}>
                                {title}
                            </Text>
                            <Text className="text-gray-500 text-xs mt-1">{url}</Text>
                            {
                                image &&
                                <View className="mt-2">
                                    <Image
                                        className="w-full h-20 rounded"
                                         source={{ uri: `${BASE_URL}${image}`}}
                                        resizeMode="contain"
                                    />
                                </View>
                            }
                            <Text className="text-gray-500 text-s mt-2">{ truncate(description, 110) }</Text>
                        </View>
                    </Pressable>
                )
            }

            {
                type === "book" && (
                    <>
                        <Text className="text-black font-medium mt-1">{title}</Text>
                        <FocusableImage
                            className="px-4 mt-2 aspect-square max-h-96 w-full max-w-2xl"
                            source={{ uri: `${BASE_URL}${image}`}}
                            resizeMode="contain"
                        />
                        <Text className="text-gray-500 text-s mt-2">{ truncate(description, 110) }</Text>
                    </>
                )
            }
        </View>
    );
}

export default SourceContent;