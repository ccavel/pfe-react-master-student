import React from 'react';

import RouteWrapper from 'app/router/routes/route-wrapper/RouteWrapper';
import { HOME_ROUTE } from 'app/router/routes.const';
import HomePage from 'components/home-page/HomePage';

const HomeRoute = () => (
    <RouteWrapper currentPage={HOME_ROUTE}>
        <HomePage />
    </RouteWrapper>
);

export default HomeRoute;
