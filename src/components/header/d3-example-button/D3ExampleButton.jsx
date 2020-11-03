import React from 'react';
import { string } from 'prop-types';
import Number2CircleOutlineIcon from 'mdi-react/Number2CircleOutlineIcon';

import { ROUTES } from 'app/router/router.config';
import LinkButton from 'components/header/link-button/LinkButton';

const D3ExampleButton = ({ currentPage }) => (
    <LinkButton
        label="Sismographe"
        to={ROUTES.SEISMOGRAPH}
        isSelected={currentPage === ROUTES.SEISMOGRAPH}
    >
        <Number2CircleOutlineIcon />
    </LinkButton>
);

D3ExampleButton.propTypes = {
    currentPage: string.isRequired,
};

export default D3ExampleButton;
