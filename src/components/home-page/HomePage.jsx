/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import React from 'react';

import logo from 'assets/logo-ensc.jpg';

import './HomePage.css';

const HomePage = () => (
    <div className="home-page">
        <div className="logo-wrapper">
            <img
                src={logo}
                alt="logo ensc"
            />
        </div>
    </div>
);

export default HomePage;
