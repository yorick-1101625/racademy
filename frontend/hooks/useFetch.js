import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        AsyncStorage.getItem('token')
            .then(token => {
                if (!token) {
                    throw Error("Authorization token is missing");
                }

                return fetch(url, {
                    signal: abortCont.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
            })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch data for that resource');
                }
                return res.json();
            })
            .then(data => {
                if (!data.success) {
                    throw Error('Something went wrong!');
                }
                setData(data.data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    return;
                }
                setIsPending(false);
                setError(err.message);
            });

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;
