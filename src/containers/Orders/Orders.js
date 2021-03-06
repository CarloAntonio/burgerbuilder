import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/actions';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    //fetch data only when component has loaded on the page
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />

        if (!this.props.loading) {
            orders = 
                this.props.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
                ));
        }

        return orders;
    }
}
const mapStateToProps = state => {
    return {
        orders: state.redOrder.orders,
        loading: state.redOrder.loading,
        token: state.redAuth.token,
        userId: state.redAuth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));