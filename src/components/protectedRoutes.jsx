'use client'
import { auth } from '@/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';


export const HideLogout = ({children}) =>{
    const [user] = useAuthState(auth);
    if(!user){
        return null;
    }
    return children;
}
