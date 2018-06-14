
//shallow renders content without deeply rendering all components
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

//setup enzyme
configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
     /*
     * TEST SETUP
     */

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    })

    /*
     * TEST EXECUTION
     */

     it('should render <BuildControls /> when recieving ingredients', () => {
         wrapper.setProps({ ingredients: {salad: 0}});

         expect(wrapper.find(BuildControls)).toHaveLength(1);
     })
})