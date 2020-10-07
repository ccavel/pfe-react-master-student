import React from 'react';
import { string, element } from 'prop-types';

import Header from 'components/header/Header';

const RouteWrapper = ({ currentPage, children }) => (
    <>
        <Header currentPage={currentPage} />
        <div className="page-wrapper">
            {children}
        </div>
    </>
);

export default RouteWrapper;

RouteWrapper.propTypes = {
    currentPage: string.isRequired,
    children: element.isRequired,
};
