
import * as actionTypes from '../actions/actTypes';
import { updateObject } from './utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            
            //updated using a utitilty function
            const updatedIngredient = {
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1 //ES6
            }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }

            return updateObject(state, updatedState);

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state, //copy layer 1 of object
                ingredients: {
                    ...state.ingredients, //copy layer 2 of object
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1 //ES6
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 4,
                error: false
            };

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            //updated using a utitilty function
            return updateObject(state, {error: true});

        default: 
            return state;
    }
};

export default reducer;