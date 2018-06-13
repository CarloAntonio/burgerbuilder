
import * as actionTypes from '../actions/actTypes';
import { updateObject } from './utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const redOrder = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            //uses utility fn
            return updateObject(state, { purchased: false });

        case actionTypes.PURCHASE_BURGER_START:
            //uses utility fn
            return updateObject(state, { loading: true });

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...state,
                id: action.orderId,
            }

            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };

        case actionTypes.PURCHASE_BURGER_FAIL:
            //uses utility fn
            return updateObject(state, { loading: false });

        case actionTypes.FETCH_ORDERS_START:
            //uses utility fn
            return updateObject(state, { loading: true });

        case actionTypes.FETCH_ORDERS_SUCCESS:
            //uses utility fn
            return updateObject(state, { 
                orders: action.orders,
                loading: false 
            });

        case actionTypes.FETCH_ORDERS_FAIL:
            //uses utility fn
            return updateObject(state, { loading: false });

        default:
            return state
    }
}

export default redOrder;