import {useState} from 'react';
import {Image, Modal, Pressable} from 'react-native';

export default function FocusableImage({ source, className="", resizeMode }) {
    const [focus, setFocus] = useState(false);

    return (
        <>
            <Pressable
                className={className}
                onPress={() => setFocus(true)}
            >
                <Image source={ source } className="h-full w-full items-end" resizeMode={ resizeMode } />
            </Pressable>

            {
                focus && (
                    <Modal className="absolute top-0 bottom-0 left-0 right-0 bg-white z-10">
                        <Pressable
                            onPress={() => setFocus(false)}
                            className="flex-1"
                        >
                            <Image
                                source={ source } className="w-full h-full"
                                resizeMode="contain"
                            />
                        </Pressable>
                    </Modal>
                )
            }
        </>
    )
}