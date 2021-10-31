import React, {useEffect, createContext, useReducer} from 'react';
import authReducer from '../reducers/AuthReducer';
import { authAction } from '../constants/actionType';

export const AuthContext = createContext();

function AuthContextProvider({children}) {
    
    const [userLogin, dispatch ] = useReducer(authReducer, {});
    
    useEffect( () => {
        dispatch({
            type: authAction.GET_USER_LOGIN,
            payload: null
        })
    }, []);
    
    const authContextData = {
        userLogin,
        dispatch
    }
    
    return (
        <AuthContext.Provider value={authContextData}>
          {children} 
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;