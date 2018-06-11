import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axiosInstance.get('ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients: res.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });

    }

    updatePurchaseState = (ingredients) => {
        //find the total number of ingredients used
        const sum = Object.keys(ingredients)
                        .map(igKey => {
                            return ingredients[igKey];
                        })
                        .reduce((sum, el) => {
                            return sum + el;
                        }, 0);

        //update state
        return sum > 0;
    }


    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('Purchase Recieved!');

        /*
        Version 1, send directly to firebase
        */

        //active spinner
        // this.setState({loading: true})

        // //create order object
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Carlo',
        //         address: {
        //             street: 'Test Street',
        //             zipCode: '12345',
        //             country: 'Zimbabwey'
        //         },
        //         email: 'testemail@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // //send order to backend
        // axiosInstance.post('/orders.json', order)
        //     .then(response => {
        //         console.log(response);
        //         this.setState({loading: false, purchasing: false}); //deactivate spinner
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({loading: false, purchasing: false}); //deactivate spinner
        //     });


        /*
        Version 2, send to checkout page
        */
       const queryParams = [];

       for(let i in this.state.ingredients) {
           queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
       }

       queryParams.push('price=' + this.state.totalPrice);

       const queryString = queryParams.join('&');

       this.props.history.push({
           pathname: '/checkout',
           search: '?' + queryString
       });

    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        
        if(this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientSubtracted={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}/>
                </Aux>
            ); 

            orderSummary = <OrderSummary 
                            ingredients={this.props.ingredients}
                            price={this.props.price}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}/>;
        }; 

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName ) => dispatch({ 
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName 
        }),
        onIngredientRemoved: (ingName ) => dispatch({ 
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName 
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));