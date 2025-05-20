import React from 'react';
import {Text, Image, View, Pressable, Dimensions} from 'react-native';
import {Linking} from 'react-native';
import {BASE_URL} from "@/utils/url";
import FocusableImage from "@/components/FocusableImage";
import YoutubePlayer from 'react-native-youtube-iframe';

function SourceContent({title, image, type, url}) {

    const videoId = React.useMemo(() => {
        if (!url) return null;
        const match = url.match(/v=([^&]+)/);
        return match ? match[1] : null;
    }, [url]);

    const screenWidth = Dimensions.get('window').width;
    const horizontalPadding = 15; //
    const playerWidth = screenWidth - horizontalPadding * 2;
    const playerHeight = (playerWidth * 9) / 16; // maintain 16:9 ratio

    return (
        <>
            {
                type === "video" && (
                    <>
                        <View
                            className="px-5 items-center">
                            <YoutubePlayer
                                height={playerHeight}
                                width={playerWidth}
                                videoId={videoId}
                                play={false}
                                webViewProps={{
                                    allowsFullscreenVideo: true,
                                    allowsInlineMediaPlayback: true,
                                }}
                            />
                        </View>
                         <Text className="text-black font-medium mt-1">{ title }</Text>
                    </>
                )
            }

            {
                type === "article" && (
                    <Pressable
                        className="mt-2 border border-gray-200 rounded-lg overflow-hidden"
                        onPress={() => Linking.openURL(url)}
                    >
                        <View className="p-3">
                            <Text className="text-gray-500 text-xs">{url}</Text>
                            <Text className="text-black font-medium mt-1" numberOfLines={2}>
                                {title}
                            </Text>
                            <View className="mt-2">
                                <Image
                                    className="w-full h-20 rounded"
                                    source={image}
                                    resizeMode="cover"
                                />
                            </View>
                        </View>
                    </Pressable>
                )
            }

            {
                type === "book" && (
                    <>
                        <FocusableImage
                            className="mt-2 h-80"
                            source={{uri: `${BASE_URL}${image}`}}
                            resizeMode="center"
                        />
                        <Text classname="text-black font-medium mt-1">{title}</Text>
                    </>
                )
            }
        </>
    );
}

export default SourceContent;