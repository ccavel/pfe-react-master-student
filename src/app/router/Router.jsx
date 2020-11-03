import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ROUTES } from './router.config';
import RouteWrapper from './route-wrapper/RouteWrapper';

const Router = () => (
    <BrowserRouter>
        <Switch>
            {
                Object.values(ROUTES).map((route) => (
                    <Route
                        key={route}
                        path={route}
                        exact
                        render={() => <RouteWrapper currentPage={route} />}
                    />
                ))
            }
        </Switch>
    </BrowserRouter>
);

export default Router;
