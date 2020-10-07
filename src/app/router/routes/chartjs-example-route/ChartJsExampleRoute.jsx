import React from 'react';

import RouteWrapper from 'app/router/routes/route-wrapper/RouteWrapper';
import { CHARTJS_EXAMPLE_ROUTE } from 'app/router/routes.const';
import ChartJsExamplePage from 'components/chartjs-example-page/ChartJsExamplePage';

const D3ExampleRoute = () => (
    <RouteWrapper currentPage={CHARTJS_EXAMPLE_ROUTE}>
        <ChartJsExamplePage />
    </RouteWrapper>
);

export default D3ExampleRoute;
