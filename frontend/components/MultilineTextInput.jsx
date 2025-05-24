import {TextInput} from "react-native";
import {useRef, useState} from "react";

function MultilineTextInput() {

    const [height, setHeight] = useState(0);
    const inputRef = useRef(null);

    function handleGrow(event) {
        setHeight(event.nativeEvent.contentSize.height);
    }

    return (
        <TextInput
            multiline={true}
            ref={inputRef}
            style={{ height: height }}
            onContentSizeChange={handleGrow}
        />
    );
}

export default MultilineTextInput;