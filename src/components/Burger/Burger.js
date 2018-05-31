import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map( (_, index) => {
                return <BurgerIngredient key={igKey + index} type={igKey} />
            });
        })
        .reduce((prevArr, currArr) => {
            return prevArr.concat(currArr);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = (
            <p>Please start adding ingredients!</p>
        );
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;