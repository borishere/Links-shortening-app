import { useCallback, useEffect, useState } from "react";

export const useAuth = (): any => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [ready, setReady] = useState(false);
    const storageItem = 'userData';

    const logIn = useCallback((token: string, id: string): void => {
        setUserToken(token);
        setUserId(id);

        localStorage.setItem(storageItem, JSON.stringify({ userToken: token, userId: id }));
    }, []);

    const logOut = useCallback(() => {
        setUserToken(null);
        setUserId(null);

        localStorage.removeItem(storageItem);
    }, [])

    useEffect(() => {
        const item = localStorage.getItem(storageItem);

        if (item) {
            const data = JSON.parse(item);

            if (data && data.userToken && data.userId) {
                logIn(data.userToken, data.userId);
            }
        }

        setReady(true);
    }, [logIn]);

    useEffect(() => {
        setReady(true);
    }, []);

    return { logIn, logOut, userToken, userId, ready };
}