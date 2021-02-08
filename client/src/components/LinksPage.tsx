import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../misc/context/AuthContext';
import { useMessage } from '../misc/hooks/messageHook';
import { useRequest } from '../misc/hooks/requestHook';
import { Tlink } from '../misc/types/types'
import { Loader } from './Loader';

export const LinksPage: React.FC = () => {
    const [httpRequest, loading, error] = useRequest();
    const { userToken } = useContext(AuthContext);
    const [links, setLinks] = useState<Tlink[]>([]);
    const history = useHistory();
    const message = useMessage();

    const loadLinks = useCallback(async () => {
        try {
            const data = await httpRequest('/api/links', 'GET', null, {
                Authorization: `Bearer ${userToken}`
            });

            setLinks(data);
        } catch (e) { }
    }, [httpRequest, userToken]);

    useEffect(() => {
        loadLinks();
    }, [loadLinks]);

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const target = e.target as Element;
        const link = links.find((el) => el._id === target.id);

        if (link) {
            history.push(`/links/${link._id}`);
        }
    }

    if (error) {
        return (
            <>
                {message(error)}
            </>
        )
    }

    return (
        <>
            {loading && <Loader />}
            {
                links.length > 0 &&
                <div className="collection">
                    {
                        links.map((link) => (
                            <a
                                href="/"
                                id={link._id}
                                key={link._id}
                                className="collection-item teal-text text-darken-2"
                                onClick={(e) => clickHandler(e)}
                            >
                                {link.initial}
                            </a>
                        ))
                    }
                </div>
            }
        </>
    );
}