import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from "@/utils/url";
import tokens, {isTokenExpired, refreshToken} from "@/utils/tokens";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        async function f() {
            try {
                let token = await AsyncStorage.getItem('access')
                if (!token) {
                    throw Error("Authorization token is missing");
                }

                if (isTokenExpired(token)) {
                    await refreshToken(); // refresh access token if it is almost expired
                    token = await AsyncStorage.getItem('access');
                }


                const res = await fetch(`${BASE_URL}${url}`, {
                    signal: abortCont.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw Error('Could not fetch data for that resource');
                }

                const data = await res.json();
                if (!data.success) {
                    throw Error('Something went wrong!');
                }

                setData(data.data);
                setError(null);
            }
            catch(err) {
                if (err.name === 'AbortError') {
                    return;
                }
                setError(err.message);
            }
            finally {
                setIsPending(false);
            }
        }

        f();
        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;
