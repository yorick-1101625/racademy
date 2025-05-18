import {Text, Image, View, Pressable} from 'react-native';
import { Linking } from 'react-native';
import {BASE_URL} from "@/utils/url";
import FocusableImage from "@/components/FocusableImage";
import truncate from "@/features/content/utils/truncate";

function SourceContent({title, image, type, url, description}) {
    return (
        <View className="px-2">
            {
                type === "video" && (
                    <>
                        <View className="relative min-h-40 max-h-96 max-w-2xl aspect-video z-50">  {/* Aspect ratio for 16:9 video */}
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${url.split('v=')[1]}`}
                                title={title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}
                                className="absolute top-0 left-0 bottom-0 right-0 rounded-md"
                            />
                            <Text className="font-semibold text-lg text-neutral-900">{ title }</Text>
                        </View>
                        <Text className="text-gray-500 text-s mt-2">{ truncate(description, 110) }</Text>
                    </>
                )
            }

            {
                type === "article" && (
                    <Pressable
                        className="max-w-2xl border border-gray-200 rounded-md overflow-hidden"
                        onPress={() => Linking.openURL(url)}
                    >
                        <View className="p-3">
                            <Text className="text-black font-medium mt-1" numberOfLines={2}>
                                {title}
                            </Text>
                            <Text className="text-gray-500 text-xs">{url}</Text>
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
                        <Text>{ title }</Text>
                        {/*<FocusableImage*/}
                        {/*    className="px-4 mt-2 aspect-square max-h-96 w-full max-w-2xl border border-gray-200 rounded-md"*/}
                        {/*    source={{ uri: `${BASE_URL}${image}`}}*/}
                        {/*    resizeMode="contain"*/}
                        {/*/>*/}
                        <Image
                            className="px-4 mt-2 aspect-square max-h-96 w-full max-w-2xl border border-gray-200 rounded-md"
                            source={{ uri: `${BASE_URL}${image}`}}
                            resizeMode="contain"
                        />
                    </>
                )
            }
        </View>
    );
}

export default SourceContent;