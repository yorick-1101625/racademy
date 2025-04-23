import {useEffect, useState} from "react";

function useFetch(url) {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if(!res.ok) {
                    throw Error('Could not fetch data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                if (!data.success) {
                    throw Error('Something went wrong!');
                }
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