import React from 'react';

import RouteWrapper from 'app/router/routes/route-wrapper/RouteWrapper';
import { D3_EXAMPLE_ROUTE } from 'app/router/routes.const';
import D3ExamplePage from 'components/d3-example-page/D3ExamplePage';

const D3ExampleRoute = () => (
    <RouteWrapper currentPage={D3_EXAMPLE_ROUTE}>
        <D3ExamplePage />
    </RouteWrapper>
);

export default D3ExampleRoute;
