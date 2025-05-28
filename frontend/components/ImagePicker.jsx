import {useState} from 'react';
import {Image, Modal, Pressable, View} from 'react-native';
import {launchImageLibraryAsync} from "expo-image-picker";
import {Ionicons} from "@expo/vector-icons";

export default function ImagePicker({state, className = ""}) {
    const [image, setImage] = state;
    const [focus, setFocus] = useState(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const result = await launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const data = result.assets[0]
            console.log(data)
            data['base64'] = data.uri.split(',')[1]
            console.log(result)
            setImage(data);
        }
    };

    return (
        <>
            {
                image
                    ? <View className={`w-full h-48 ${className}`}>
                        <Pressable onPress={() => setFocus(true)} className="flex-1">
                            <Image
                                source={{uri: image.uri}}
                                className="w-full h-full"
                                resizeMode="contain"
                            />
                        </Pressable>
                    </View>
                    :
                    <Pressable
                        onPress={pickImage}
                        className="flex-1 justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-8"
                    >
                        <Ionicons name="images-outline" size={48} color="#3daad3"/>
                    </Pressable>
            }

            {
                focus && image && (
                    <Modal className="absolute top-0 bottom-0 left-0 right-0 bg-white z-10">
                        <View
                            className="absolute bottom-0 right-0 z-20 bg-white border border-gray-200 rounded-t-md flex-row">
                            {/* Clear image */}
                            <Pressable
                                className="w-16 h-16 items-center justify-center"
                                onPress={() => {
                                    setFocus(false);
                                    setImage(null);
                                }}
                            >
                                <Ionicons name="trash-outline" size={36} color="#3daad3"/>
                            </Pressable>
                            {/* Re-Upload */}
                            <Pressable
                                className="w-16 h-16 items-center justify-center"
                                onPress={pickImage}
                            >
                                <Ionicons name="images" size={36} color="#3daad3"/>
                            </Pressable>
                            {/* Close */}
                            <Pressable
                                className="w-16 h-16 justify-center items-center"
                                onPress={() => setFocus(false)}
                            >
                                <Ionicons name="close-circle-outline" color="#3daad3" size={36}/>
                            </Pressable>
                        </View>

                        <Pressable
                            className="flex-1"
                            onPress={() => setFocus(false)}
                        >
                            <Image
                                source={{uri: image.uri}} className="w-full h-full"
                                resizeMode="contain"
                            />
                        </Pressable>
                    </Modal>
                )
            }
        </>
    )
}