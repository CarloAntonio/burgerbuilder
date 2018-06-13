import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {

        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuth}
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuth={this.props.isAuth}
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer}/>
                <main className={classes.content}>
                    {this.props.children}
                </main> 
            </Aux>   
        );
    };
};

const mapStateToProps = state => {
    return {
        isAuth: state.redAuth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);