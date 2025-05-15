import { useState } from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {launchImageLibraryAsync} from "expo-image-picker";
import {Ionicons} from "@expo/vector-icons";

export default function ImagePicker() {
    const [image, setImage] = useState(null);
    const [focus, setFocus] = useState(false);
    console.log(image)

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <>
            {
            image
            ?   <Pressable
                    className="flex-1"
                    onPress={() => setFocus(true)}
                >
                    <Image source={{ uri: image }} className="w-full h-full"/>
                </Pressable>
            :   <Pressable
                    onPress={pickImage}
                    className="flex-1 justify-center items-center"
                >
                    <Ionicons name="images" size={36} color="#3daad3" />
                </Pressable>
            }

            {
                focus && (
                    <View className="absolute top-0 bottom-0 left-0 right-0 bg-white z-10">
                        <View className="absolute bottom-0 right-0 z-20 bg-white shadow-md rounded-t-md flex-row">
                            {/* Re-Upload */}
                            <Pressable
                                className="w-16 h-16 items-center justify-center"
                                onPress={pickImage}
                            >
                                <Ionicons name="images" size={36} color="#3daad3" />
                            </Pressable>
                            {/* Close */}
                            <Pressable
                                className="w-16 h-16 justify-center items-center"
                                onPress={() => setFocus(false)}
                            >
                                <Ionicons name="close-circle-outline" color="#3daad3" size={36}/>
                            </Pressable>
                        </View>

                        <Image
                            source={{ uri: image }} className="w-full h-full"
                            resizeMode="contain"
                        />
                    </View>
                )
            }
        </>
    )
}