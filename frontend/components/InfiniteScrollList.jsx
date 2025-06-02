import {ActivityIndicator, FlatList, View} from 'react-native';
import NoResults from "@/features/search/components/NoResults";
import {useEffect, useState} from "react";
import fatty from "@/utils/fatty";
import Error from "@/components/Error";

function InfiniteScrollList({ renderItem, className="", noResultsTitle="Geen Resultaten", noResultsMessage="Er is niks gevonden.", url, params="", refresh }) {

    const [currentOffset, setCurrentOffset] = useState(0);
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [listEnded, setListEnded] = useState(false);

    const limit = 10;
    url = `${url}?${params}&offset=${currentOffset}&limit=${limit}`;

    useEffect(() => {
        setListEnded(false);
        if (currentOffset !== 0) {
            setCurrentOffset(0); // Clear offset when params such as queries change
        }
        else {
            getData();
        }
    }, [params]);

    useEffect(() => {
        getData();
    }, [currentOffset]);

    useEffect(() => {
        setCurrentOffset(0);
        setListEnded(false);
        getData();
      }, [refresh]);

    function getData() {
        if (listEnded) {
            return;
        }
        setIsPending(true);
        fatty(url)
            .then(data => {
                if (data.success) {
                    if (currentOffset === 0) {
                        setData(data.data);
                    }
                    else {
                        setData(d => [...d, ...data.data]);
                    }

                    if (data.data.length < limit) {
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
            .catch(err => setError(err))
            .finally(() => setIsPending(false));
    }

    function handleItemLoading() {
        setCurrentOffset(c => c + 10);
    }

    if (isPending && (!data || data.length === 0)) return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#3daad3"/>
        </View>
    );

    if (error) return <Error />;

    if (!data || data.length === 0) return <NoResults title={noResultsTitle} message={noResultsMessage}/>


    return (
        data &&
        <FlatList
            className={className}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            ListFooterComponent={listEnded ? <></> : <ActivityIndicator className="py-3" size="large" color="#3daad3" />}
            onEndReached={handleItemLoading}
            onEndReachedThreshold={0}
        />
    );
}

export default InfiniteScrollList;