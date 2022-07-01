import {createContext} from 'react';

export default createContext<any>({
    showAlert: false,
    alertType: "success"
});