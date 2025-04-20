import {Pressable, Text, View} from 'react-native';

function SectionMenu({ handleSwitchSection }) {
    return (
        <View className="flex-row w-full sm:max-w-xl justify-center items-center border-b border-neutral-300 bg-neutral-50">
            <Pressable
                className="py-5 border-b flex-1 items-center hover:bg-neutral-200 transition-colors"
                onPress={() => handleSwitchSection('posts')}
            >
                <Text className="text-lg font-semibold">Posts</Text>
            </Pressable>
            <Pressable
                className="py-5 flex-1 items-center hover:bg-neutral-200 transition-colors"
                onPress={() => handleSwitchSection('sources')}
            >
                <Text className="text-lg font-semibold">Bronnen</Text>
            </Pressable>
        </View>
    );
}

export default SectionMenu;