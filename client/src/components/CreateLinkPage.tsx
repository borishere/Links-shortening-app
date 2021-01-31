import React, { useContext, useState } from 'react';
import { AuthContext } from '../misc/context/AuthContext';
import { useMessage } from '../misc/hooks/messageHook';
import { useRequest } from '../misc/hooks/requestHook';

export const CreateLinkPage: React.FC = () => {
    const [link, setLink] = useState('');
    const { userId } = useContext(AuthContext);
    const [httpRequest] = useRequest();
    const showMessage = useMessage();

    const createLinkHandler = async () => {
        try {
            const data = await httpRequest(
                '/api/links/shorten',
                'POST',
                { initialLink: link, userId },
                { 'Content-Type': 'application/json' }
            );

            if (data.short) {
                setLink(data.short);
            }

            showMessage('Link created!');
        } catch (error) {
            showMessage(error);
        }
    }

    return (
        <div className="row">
            <h2>Insert your link</h2>
            <div style={{ display: 'flex' }}>
                <div
                    className="input-field col s12"
                    style={{ margin: 0 }}>
                    <input
                        id="link"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        style={{ margin: 0 }}
                    />
                    <label htmlFor="link">Link</label>
                </div>
                <button
                    className="btn"
                    style={{ alignSelf: 'flex-end', marginBottom: '-1px' }}
                    onClick={createLinkHandler}
                >
                    Create
                </button>
            </div>
        </div>
    );
}