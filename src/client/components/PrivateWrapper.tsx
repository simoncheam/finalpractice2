import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router';
import { APIService, TOKEN_KEY } from '../services/APIService';

const PrivateWrapper = ({ children }: PrivateRouteProps) => {

    const nav = useNavigate();

    const [isAuthed, setIsAuthed] = useState(false)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    useEffect(() => {

        APIService(`/auth/validate`)
            .then(res => {

                const tokenStatus = res.message === 'valid';
                console.log({ tokenStatus });
                setIsAuthed(tokenStatus)
                setIsLoaded(true)
            })
            .catch(error => {
                setIsLoaded(true)
                console.log(error);
                console.log('not authorized!');

            });

    }, [])

    if (!isLoaded) return <>loading</>;

    if (!isAuthed) {
        return <Navigate to='/login' />
    } else {
        return (
            <>
                {children}

                <Outlet />

            </>
        )

    }

}

interface PrivateRouteProps {
    path?: string;
    exact?: boolean;
    children?: React.ReactNode;
}


export default PrivateWrapper
