
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-afdf7.firebaseio.com/'
});

export default instance;