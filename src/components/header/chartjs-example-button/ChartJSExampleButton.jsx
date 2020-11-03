import React from 'react';
import { string } from 'prop-types';
import Number1CircleOutlineIcon from 'mdi-react/Number1CircleOutlineIcon';

import { ROUTES } from 'app/router/router.config';
import LinkButton from 'components/header/link-button/LinkButton';

const ChartJSExampleButton = ({ currentPage }) => (
    <LinkButton
        label="Spider Graph"
        to={ROUTES.SPIDER}
        isSelected={currentPage === ROUTES.SPIDER}
    >
        <Number1CircleOutlineIcon />
    </LinkButton>
);

ChartJSExampleButton.propTypes = {
    currentPage: string.isRequired,
};

export default ChartJSExampleButton;
