import {View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView} from 'react-native';
import React, {useState} from "react";
import useUser from "@/hooks/useUser";
import {BASE_URL} from "@/utils/url";
import {Ionicons} from "@expo/vector-icons";
import {showError, showSuccess} from "@/utils/toast";
import fatty from "@/utils/fatty";

function CommentCreate(post_id) {
    const {user} = useUser();
    const [comment, setComment] = useState("");

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
                    console.error(data.message);
                    showError("Er ging iets fout.");
                }
            })
    }

    return (
        <View
            className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex-row items-center space-x-3">
            <Image
                source={{uri: `${BASE_URL}${user.profile_picture}`}}
                className="w-10 h-10 rounded-full"
            />

            <View className="flex-1 border border-gray-300 rounded-md px-4 py-2 justify-center">
                <TextInput
                    placeholder="Wat wil je zeggen..."
                    placeholderTextColor="#888"
                    className="text-sm text-black p-0 outline-none"
                    multiline={false}
                    onChangeText={setComment}
                />
            </View>

            <KeyboardAvoidingView>
                <TouchableOpacity onPress={handleSubmit}>
                    <Ionicons name="send" size={22} className="text-rac"/>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>

    );


}

export default CommentCreate;