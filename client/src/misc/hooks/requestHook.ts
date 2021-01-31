import { useCallback, useState } from "react";

export const useRequest = (): Array<any> => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetError = () => setError(null);

    const httpRequest = useCallback(async (url: string, method = 'GET', body = null, headers = {}) => {
        setLoading(true);

        let options = {
            method,
            body,
            headers
        }

        if (method !== 'GET') {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (!response.ok) {
                setError(null);
                throw new Error(data.message || 'Request error');
            }

            setLoading(false);
            setError(null);

            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    return [httpRequest, loading, error, resetError];
}