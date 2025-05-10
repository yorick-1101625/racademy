import {Text, Image, View} from 'react-native';

function SourceContent({ title, image, type, url }) {
    return (
        <>
            <Text className="font-bold text-2xl text-rac">{ title }</Text>

            {type === "video" ? (
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
                    </View>
                ) : (
                    <Image
                    className="mt-2 h-80"
                    source={ image }
                    resizeMode="contain"
                    // height={500}
                    />
                )
            }
        </>
    );
}

export default SourceContent;