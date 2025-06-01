import {TextInput} from "react-native";
import {useRef, useState} from "react";

function MultilineTextInput({ placeholder, className, onChangeText }) {

    const [height, setHeight] = useState(128);
    const inputRef = useRef(null);

    function handleGrow(event) {
        setHeight(event.nativeEvent.contentSize.height);
    }

    return (
        <TextInput
            multiline={true}
            ref={inputRef}
            style={{
                minHeight: 128,
                height: Math.max(128, height),
            }}
            onContentSizeChange={handleGrow}
            placeholder={placeholder}
            className={className}
            onChangeText={onChangeText}
            textAlignVertical="top"
        />
    );
}

export default MultilineTextInput;