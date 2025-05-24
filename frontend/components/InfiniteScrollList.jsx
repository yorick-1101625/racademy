import {ActivityIndicator, FlatList, View} from 'react-native';
import NoResults from "@/features/search/components/NoResults";
import {useEffect, useState} from "react";
import fatty from "@/utils/fatty";
import Error from "@/components/Error";

function InfiniteScrollList({ renderItem, className="", noResultsMessage="Er is niks gevonden.", url, params="" }) {

    const [currentOffset, setCurrentOffset] = useState(0);
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [listEnded, setListEnded] = useState(false);

    url = `${url}?${params}&offset=${currentOffset}&limit=10`;

    useEffect(() => {
        if (currentOffset === 0) {
            setCurrentOffset('0'); // TODO: find fix?
        }
        else {
            setCurrentOffset(0); // Clear offset when params such as queries change
        }
    }, [params]);

    useEffect(() => {
        getData();
    }, [currentOffset]);

    function getData() {
        console.log('fetch', currentOffset)
        fatty(url)
            .then(data => {
                if (data.success) {
                    if (currentOffset === 0 || currentOffset === '0') {
                        setData(data.data);
                    }
                    else {
                        setData(d => [...d, ...data.data]);
                    }

                    if (data.data.length === 0) {
                        setListEnded(true);
                    }
                    else {
                        setListEnded(false);
                    }
                }
                else {
                    setError(data.message);
                }
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setIsPending(false);
            });
    }

    function handleItemLoading() {
        setCurrentOffset(c => parseInt(c) + 10); //TODO: find fix?

    }

    if (isPending) return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#3daad3"/>
        </View>
    );

    if (error) return <Error />;

    if (!data || data.length === 0) return <NoResults message={noResultsMessage}/>
    console.log(data)
    return (
        data &&
        <FlatList
            className={className}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            ListFooterComponent={listEnded ? <></> : <ActivityIndicator className="my-5" size="large" color="#3daad3" />}
            onEndReached={handleItemLoading}
            onEndReachedThreshold={0}
        />
    );
}

export default InfiniteScrollList;