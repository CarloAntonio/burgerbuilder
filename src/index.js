import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/redBurgerBuilder';
import orderReducer from './store/reducers/redOrder';
import authReducer from './store/reducers/redAuth';

//add thunk and have it work with redux dev tools
//add turnary expressiong for showing redux dev tools only in development mode
const composeEnhancers = 
    process.env.NODE_ENV === 'development' 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    : null || compose;

const rootReducer = combineReducers({
    redBurgerBuilder: burgerBuilderReducer,
    redOrder: orderReducer,
    redAuth: authReducer
})

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
