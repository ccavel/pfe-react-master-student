import React from 'react';
import { string } from 'prop-types';

import Header from 'components/header/Header';

import { ROUTES_COMPONENTS } from '../router.config';

const RouteWrapper = ({ currentPage }) => {
    const Component = ROUTES_COMPONENTS[currentPage];
    return (
        <>
            <Header currentPage={currentPage} />
            <div className="page-wrapper">
                <Component />
            </div>
        </>
    );
};

export default RouteWrapper;

RouteWrapper.propTypes = {
    currentPage: string.isRequired,
};
