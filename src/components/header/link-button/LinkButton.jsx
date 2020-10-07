import React from 'react';
import { element, bool, string } from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './LinkButton.css';

function LinkButton({ children, isSelected, label, to }) {
    return (
        <div className={classNames('link-button', {
            'is-selected': isSelected,
        })}
        >
            <Link to={to}>
                <div>
                    {children}
                    {label}
                </div>
            </Link>
        </div>
    );
}

LinkButton.propTypes = {
    children: element.isRequired,
    isSelected: bool.isRequired,
    to: string.isRequired,
    label: string.isRequired,
};

export default LinkButton;
