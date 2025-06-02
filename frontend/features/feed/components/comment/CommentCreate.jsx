import {View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform} from 'react-native';
import React, {useState} from "react";
import useUser from "@/hooks/useUser";
import {BASE_URL} from "@/utils/url";
import {Ionicons} from "@expo/vector-icons";
import {showError, showSuccess} from "@/utils/toast";
import fatty from "@/utils/fatty";
import {useSafeAreaInsets} from "react-native-safe-area-context";

function CommentCreate(post_id) {
    const {user} = useUser();
    const [comment, setComment] = useState("");
    const insets = useSafeAreaInsets();
    const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';



    function handleSubmit() {
        if (!(comment.trim())) {
            showError("Comment mag niet leeg zijn.");
            return
        }

        fatty('/api/comment/', 'POST', {
            content: comment.trim(),
            post_id: post_id.post_id
        })
            .then(data => {
                if (data.success) {
                    showSuccess("Comment toegevoegd.");
                } else {
                    // console.error(data.message);
                    showError("Er ging iets fout.");
                }
            })
    }

    return (
        <View
            style={isMobile ? { paddingBottom: insets.bottom } : null}
            className="bg-white border-t border-gray-200 px-4 py-3 flex-row items-center">
            <Image
                source={{uri: `${BASE_URL}${user.profile_picture}`}}
                className="w-10 h-10 rounded-full"
            />

            <View className="flex-1 border border-gray-300 rounded-md px-4 py-2 justify-center ml-3">
                <TextInput
                    placeholder="Wat wil je zeggen..."
                    placeholderTextColor="#888"
                    className="text-sm text-black p-0 outline-none"
                    multiline={false}
                    onChangeText={setComment}
                />
            </View>

            <TouchableOpacity onPress={handleSubmit} className="ml-3">
                <Ionicons name="send" size={22} color="#3daad3" />
            </TouchableOpacity>
        </View>

    );


}

export default CommentCreate;