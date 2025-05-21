import {Modal, Pressable, View} from 'react-native';

function BottomModal({state, children }) {

    const [isVisible, setIsVisible] = state;

    return (
        <Modal
                visible={isVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsVisible(false)}
            >
                <View className="flex-1 justify-end bg-black" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <Pressable className="flex-1" onPress={() => setIsVisible(false)} />

                    <View className="bg-white p-6 rounded-t-2xl">
                        {
                            children
                        }
                    </View>
                </View>
        </Modal>
    );
}

export default BottomModal;