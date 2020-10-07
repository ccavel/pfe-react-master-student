import React from 'react';
import { string } from 'prop-types';
import HomeIcon from 'mdi-react/HomeIcon';

import { HOME_ROUTE } from 'app/router/routes.const';
import LinkButton from 'components/header/link-button/LinkButton';

const HomeButton = ({ currentPage }) => (
    <LinkButton
        label="Home"
        to={HOME_ROUTE}
        isSelected={currentPage === HOME_ROUTE}
    >
        <HomeIcon />
    </LinkButton>
);

HomeButton.propTypes = {
    currentPage: string.isRequired,
};

export default HomeButton;
