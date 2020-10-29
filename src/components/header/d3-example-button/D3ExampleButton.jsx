import React from 'react';
import { string } from 'prop-types';
import Number2CircleOutlineIcon from 'mdi-react/Number2CircleOutlineIcon';

import { D3_EXAMPLE_ROUTE } from 'app/router/routes.const';
import LinkButton from 'components/header/link-button/LinkButton';

const D3ExampleButton = ({ currentPage }) => (
    <LinkButton
        label="Sismographe"
        to={D3_EXAMPLE_ROUTE}
        isSelected={currentPage === D3_EXAMPLE_ROUTE}
    >
        <Number2CircleOutlineIcon />
    </LinkButton>
);

D3ExampleButton.propTypes = {
    currentPage: string.isRequired,
};

export default D3ExampleButton;
