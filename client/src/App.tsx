import React from 'react';
import './App.scss';
import 'materialize-css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './misc/context/AuthContext';
import { useRotes } from './misc/hooks/routesHook';
import { useAuth } from './misc/hooks/authHook';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';

export const App: React.FC = () => {
    const { logIn, logOut, userToken, userId, ready } = useAuth();
    const isLoggedIn = Boolean(userToken);
    const routes = useRotes(isLoggedIn)

    if (!ready) {
        return (
            <Loader />
        )
    }

    return (
        <AuthContext.Provider value={{ logIn, logOut, userToken, userId }}>
            <BrowserRouter>
                {
                    isLoggedIn && <Navbar />
                }
                <div className="container center-align">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}