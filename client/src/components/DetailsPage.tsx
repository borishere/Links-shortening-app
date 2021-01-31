import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../misc/context/AuthContext';
import { useRequest } from '../misc/hooks/requestHook';
import { TDetailsPageParams, Tlink } from '../misc/types/types'

export const DetailsPage: React.FC = () => {
    const { id } = useParams<TDetailsPageParams>();
    const [httpRequest] = useRequest();
    const { userToken } = useContext(AuthContext);
    const [link, setLink] = useState<Tlink>({
        initial: '',
        short: '',
        _id: ''
    });

    const loadLink = useCallback(async () => {
        try {
            const data = await httpRequest(`/api/links/${id}`, 'GET', null, {
                Authorization: `Bearer ${userToken}`
            });

            setLink(data[0]);
        } catch (e) { }
    }, [httpRequest, userToken, id]);

    useEffect(() => {
        loadLink();
    }, [loadLink]);

    return (
        <div className="row">
            <div className="col s12">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <h2>Link details</h2>
                        <h4>Initial:</h4>
                        {link.initial}
                        <h4>Short:</h4>
                        {link.short}
                    </div>
                </div>
            </div>
        </div>
    );
}