import { Pressable, Text, View } from 'react-native';

function TopTabs({ tabs, state }) {
    /*
    * Usage:
    * <TopTabs
    *   tabs={ [{ value: 'tab1', label:'Tab 1' }...] }
    *   state={ [yourState, setYourState] }
    * />
    * */

    const [_state, _setState] = state;

    return (
        <View className="flex-row mt-4 mb-4">
            {tabs.map((tab) => (
                <Pressable
                    key={tab.value}
                    onPress={() => _setState(tab.value)}
                    className={`px-3 py-2 rounded-md mr-2 ${_state === tab.value ? "bg-rac" : "bg-gray-200"}`}
                >
                    <Text className={_state === tab.value ? "text-white" : "text-black"}>
                        {tab.label}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}

export default TopTabs;
