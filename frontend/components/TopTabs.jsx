import {Pressable, ScrollView, Text, View} from 'react-native';

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

        <ScrollView className=" mt-4 mb-4" horizontal>
            {tabs.map((tab) => (
                <Pressable
                    key={tab.value}
                    onPress={() => _setState(tab.value)}
                    className={`text-base px-3 py-2 rounded-md mr-2 ${_state === tab.value ? "bg-rac" : "bg-neutral-100"}`}
                >
                    <Text className={_state === tab.value ? "text-white" : "text-neutral-700"}>
                        {tab.label}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    );
}

export default TopTabs;
