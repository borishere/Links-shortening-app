import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../misc/context/AuthContext';
import { useRequest } from '../misc/hooks/requestHook';
import { Loader } from './Loader';

export const AuthPage: React.FC = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [httpRequest, loading, error, resetError] = useRequest();
    const { logIn } = useContext(AuthContext);
    useEffect(() => {
        if (error) {
            M.toast({ html: error, classes: 'blue lighten-4 black-text' });

            resetError();
        }
    }, [error, resetError])

    const formChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setForm({
            ...form,
            [e.target.type]: e.target.value
        });
    }

    const loginHandler = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            const data = await httpRequest('api/auth/login',
                'POST',
                { ...form },
                { 'Content-type': 'application/json' }
            );

            if (data) {
                logIn(data.token, data.userId);
            }

        } catch (e) { }
    }

    const signUpHandler = async () => {
        try {
            await httpRequest('api/auth/register',
                'POST',
                { ...form },
                { 'Content-type': 'application/json' }
            );
        } catch (e) { }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card  blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" value={form.email} onChange={(e) => formChangeHandler(e)} />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" value={form.password} onChange={(e) => formChangeHandler(e)} />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    {
                        loading && <Loader />
                    }
                    <div className="card-action">
                        <button className="waves-effect waves-light btn-large"
                            onClick={loginHandler}
                        >
                            Login
                            </button>
                        <button
                            className="sign-up-btn waves-effect waves-light btn-large"
                            onClick={signUpHandler}
                        >
                            Sign Up
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
}