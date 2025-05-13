import {Text, Image, View, Pressable} from 'react-native';
import { Linking } from 'react-native';
import {BASE_URL} from "@/utils/url";

function SourceContent({title, image, type, url}) {
    return (
        <>
            {
                type === "video" && (
                    <View className="relative pt-[56.25%] z-50">  {/* Aspect ratio for 16:9 video */}
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${url.split('v=')[1]}`}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                        />
                        <Text className="font-bold text-lg text-neutral-900">{ title }</Text>
                    </View>
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
                        <Text>{ title }</Text>
                        {/*TODO: find better image location/formatting?*/}
                        <Image
                            className="mt-2 h-80"
                            source={{ uri: `${BASE_URL}${image}`}}
                            resizeMode="center"
                        />
                    </>
                )
            }
        </>
    );
}

export default SourceContent;