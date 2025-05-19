import {Pressable, Text, View} from 'react-native';

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
        <View className="justify-around bg-white flex-row h-12 shadow-sm shadow-gray-200 items-end">
            {
                tabs.map((tab, i) => (
                     <Pressable
                         key={tab.value}
                         className="flex-1 justify-end h-full"
                         onPress={() => _setState(tab.value)}
                     >
                         <View className="px-6">
                            <Text
                                className={`flex justify-center text-[1rem] text-gray text-center transition-all duration-75 h-9 box-border ${_state === tab.value && 'border-b-2 border-rac'}`}
                            >
                                {tab.label}
                            </Text>
                         </View>
                    </Pressable>
                ))
            }
        </View>
    );
}

export default TopTabs;