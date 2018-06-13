import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <Logo logoHeight="80%"/>
            <nav className={classes.DesktopOnly}>
                <NavItems isAuth={props.isAuth}/>
            </nav>
        </header>
    );
}

export default toolbar;