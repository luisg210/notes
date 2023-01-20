import { useDispatch, useSelector } from "react-redux"
import { onChecking, onLogin, onLogout } from '../store/auth/authSlice';
import api from '../api/api';

export const useAuthStore = () => {
    
    const { status, errorMsg, user } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ( { user, password } ) => {
        dispatch( onChecking() );

        try {
            console.log('Antes de mandar la request');
            const { data } = await api.post('auth/login', { user, password }, { headers: {'Access-Control-Allow-Origin': '*' }});
            
            if (data.token) {    
                localStorage.setItem('x-token', data.token);
                localStorage.setItem('user-id', data.uid);
                
                dispatch( onLogin({ user: data.user, uid: data.uid }) );

            } else {
                dispatch( onLogout( 'Credenciales no coiciden' ) ); 
            }  

        } catch (err) { 
            console.log(err); 
            dispatch( onLogout(err) );
        }
    } 

    const startRegister = async ( {user, password, name} ) => {
        dispatch( onChecking() ); 

        try {
            const { data } = await api.post('auth/register', { user, password, name }, { headers: {'Access-Control-Allow-Origin': '*' }});
            console.log(data);
            if (data.token) {     
                localStorage.setItem('x-token', data.token);
                localStorage.setItem('user-id', data.uid);

                dispatch( onLogin({ user: data.user, uid: data.uid }) );

            } else {
                dispatch( onLogout( data.msg ) ); 
            }

        } catch (error) {
            console.log(error);
            dispatch( onLogout( error.response.data?.msg ) );
        }
    }

    const checkAuthToken = async () => {
        dispatch( onChecking() );

        const token = localStorage.getItem('x-token'); 

        if ( !token ) return dispatch( onLogout() ); 

        try {
            const { data } = await api.get('auth/renew');
            
            localStorage.setItem('x-token', data.token);
            localStorage.setItem('user-id', data.uid);
    
            dispatch( onLogin( { user: data.user, uid: data.uid }) );

        } catch (err) {
            console.error(err);
            localStorage.clear();
            dispatch(onLogout())
        }
    }

    const logOut = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }

    return {
        status,
        errorMsg,
        user,

        startRegister,
        startLogin,
        checkAuthToken,
        logOut,
    }
}