import React from 'react';
import { string } from 'prop-types';
import HomeIcon from 'mdi-react/HomeIcon';

import { ROUTES } from 'app/router/router.config';
import LinkButton from 'components/header/link-button/LinkButton';

const HomeButton = ({ currentPage }) => (
    <LinkButton
        label="Home"
        to={ROUTES.HOME}
        isSelected={currentPage === ROUTES.HOME}
    >
        <HomeIcon />
    </LinkButton>
);

HomeButton.propTypes = {
    currentPage: string.isRequired,
};

export default HomeButton;
