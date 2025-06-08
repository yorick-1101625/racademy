import {Text, Image, View} from 'react-native';
import {BASE_URL} from "@/utils/url";
import YoutubePlayer from 'react-native-youtube-iframe';
import {useMemo} from "react";
import FocusableImage from "@/components/FocusableImage";
import {Link} from "expo-router";
import {Entypo} from "@expo/vector-icons";

function SourceContent({sourceId, difficulty, title, image, type, url, description}) {

    const videoId = useMemo(() => {
        if (!url) return null;
        const match = url.match(/v=([^&]+)/);
        return match ? match[1] : null;
    }, [url]);


    return (
        <View>
            <View className="max-w-2xl">
            {
                type === "video" &&
                    <>
                        <View className="
                            relative min-h-40 max-h-96 aspect-video z-50 rounded-md overflow-hidden
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
                    </>
            }

            {
                type === "article" && (
                    <Link
                        href={url}
                        className="max-w-2xl border border-gray-200 rounded-md overflow-hidden"
                    >
                        <View className="p-3 w-full">
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
                        </View>
                    </Link>
                )
            }

            {
                type === "book" && (
                    <>
                        <FocusableImage
                            className="mt-2 aspect-square max-h-96 w-full max-w-2xl"
                            source={{ uri: `${BASE_URL}${image}`}}
                            resizeMode="contain"
                        />
                        <Link href={`/sources/${sourceId}`} className="mt-2">
                            <Text className="text-black font-medium">{title}</Text>
                        </Link>
                    </>
                )
            }
            </View>

            <Link href={`/sources/${sourceId}`} className="mt-2">
                <View className="flex-row justify-between items-start w-full">
                    <Text className="text-gray-500 text-sm flex-row">{ description }</Text>
                    <View className="block ml-auto">
                    {
                        difficulty === 'easy' &&
                        <Entypo size={24} color="#3daad3" name="progress-empty"/>
                    }
                    {
                        difficulty === 'medium' &&
                        <Entypo size={24} color="#3daad3" name="progress-one"/>
                    }
                    {
                        difficulty === 'hard' &&
                        <Entypo size={24} color="#3daad3" name="progress-two"/>
                    }
                    {
                        difficulty === 'expert' &&
                        <Entypo size={24} color="#3daad3" name="progress-full"/>
                    }
                    </View>
                </View>
            </Link>
        </View>
    );
}

export default SourceContent;