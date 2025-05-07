import {View} from 'react-native';

function Card({ children }) {
    return (
        <View className="bg-white border border-neutral-200 mt-3 p-5 hover:shadow-md hover:shadow-neutral-200 transition-shadow rounded-lg relative cursor-pointer">
            { children }
        </View>
    );
}

export default Card;