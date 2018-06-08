import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import axiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';

class ContactData extends Component {
    
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        //prevent page from reloading
        e.preventDefault();

        //active spinner
        this.setState({loading: true})

        //create order object
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Carlo',
                address: {
                    street: 'Test Street',
                    zipCode: '12345',
                    country: 'Zimbabwey'
                },
                email: 'testemail@test.com'
            },
            deliveryMethod: 'fastest'
        }

        //send order to backend
        axiosInstance.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false}); //deactivate spinner
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false}); //deactivate spinner
            });
        
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="email" name="email" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Your Street Address" />
                <input type="text" name="postal" placeholder="Your Post Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;