import React from 'react';

import burgerLogo from '../../assets/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.logoHeight}}>
            <img src={burgerLogo} alt="My Burger" />
        </div>
    );
}

export default logo;