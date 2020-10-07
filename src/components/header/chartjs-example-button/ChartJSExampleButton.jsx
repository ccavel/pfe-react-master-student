import React from 'react';
import { string } from 'prop-types';
import Number1CircleOutlineIcon from 'mdi-react/Number1CircleOutlineIcon';

import { CHARTJS_EXAMPLE_ROUTE } from 'app/router/routes.const';
import LinkButton from 'components/header/link-button/LinkButton';

const ChartJSExampleButton = ({ currentPage }) => (
    <LinkButton
        label="Chart.js Example"
        to={CHARTJS_EXAMPLE_ROUTE}
        isSelected={currentPage === CHARTJS_EXAMPLE_ROUTE}
    >
        <Number1CircleOutlineIcon />
    </LinkButton>
);

ChartJSExampleButton.propTypes = {
    currentPage: string.isRequired,
};

export default ChartJSExampleButton;
