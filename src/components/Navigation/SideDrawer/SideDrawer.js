import React from 'react';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer, props.open ? classes.Open :classes.Close];

    return (
        <Aux>
            <Backdrop 
                show 
                clicked={props.closed}
                show={props.open}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;