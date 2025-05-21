import {SafeAreaView, TextInput, View} from 'react-native';

function CreatePost() {
    return (
        <SafeAreaView className="flex-1">
            <TextInput placeholder="Titel" />

        </SafeAreaView>
    );
}

export default CreatePost;