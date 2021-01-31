import React from 'react';
import { TauthContext } from '../types/types';

const defaultValues = {
    logIn: () => { },
    logOut: () => { },
    userToken: null,
    userId: null
};



export const AuthContext = React.createContext<TauthContext>(defaultValues);