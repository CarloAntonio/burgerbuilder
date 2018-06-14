
//shallow renders content without deeply rendering all components
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

//setup enzyme
configure({ adapter: new Adapter() });

//param 1: title, outputs to console
//param 2: testing function
describe('<NavItems />', () => {

    /*
     * TEST SETUP
     */

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavItems />);
    })

    /*
     * TEST EXECUTION
     */

    //param 1: title, outputs to console
    it('should render two <NavItems /> elements if not authenticated', () => {

        //expection
        expect(wrapper.find(NavItem)).toHaveLength(2);
    }); 

    it('should render three <NavItems /> elements if authenticated', () => {
        wrapper.setProps({ isAuth: true });

        //expection
        expect(wrapper.find(NavItem)).toHaveLength(3);
    }); 

    it('should show an exact logout button', () => {
        wrapper.setProps({ isAuth: true });

        //expection
        expect(wrapper.contains(<NavItem link='/logout'>Logout</NavItem>)).toEqual(true);
    }); 
});