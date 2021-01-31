import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthPage } from '../../components/AuthPage';
import { CreateLinkPage } from '../../components/CreateLinkPage';
import { DetailsPage } from '../../components/DetailsPage';
import { LinksPage } from '../../components/LinksPage';

export const useRotes = (isLoggedIn: boolean) => {
    if (isLoggedIn) {
        return (
            <Switch>
                <Route exact path='/create'>
                    <CreateLinkPage />
                </Route>
                <Route exact path='/links'>
                    <LinksPage />
                </Route>
                <Route path='/links/:id'>
                    <DetailsPage />
                </Route>
                <Redirect to='/create' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path='/auth'>
                <AuthPage />
            </Route>
            <Redirect to='/auth' />
        </Switch>
    )
};