import React from 'react';
import { string } from 'prop-types';

import './Header.css';
import HomeButton from 'components/header/home-button/HomeButton';
import D3ExampleButton from 'components/header/d3-example-button/D3ExampleButton';
import ChartJSExampleButton from 'components/header/chartjs-example-button/ChartJSExampleButton';

const Header = ({ currentPage }) => (
    <div className="header">
        <HomeButton currentPage={currentPage} />
        <div className="navigation">
            <ChartJSExampleButton currentPage={currentPage} />
            <D3ExampleButton currentPage={currentPage} />
        </div>
    </div>
);

export default Header;

Header.propTypes = {
    currentPage: string.isRequired,
};
