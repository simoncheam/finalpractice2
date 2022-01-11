import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { APIService } from '../services/APIService';


const Navbar = (props: INavbarProps) => {

    const loc = useLocation();
    const [isAuthed, setIsAuthed] = useState(false);


    useEffect(() => {

        APIService(`/api/validate`)
            .then(res => {

                const tokenStatus = res.message === 'valid'

                setIsAuthed(tokenStatus);
            })
            .catch(error => {
                console.log(error);
            });
    }, [loc.pathname])

    return (
        <div className='bg-success'>
            <Link type='button' className='btn btn-primary m-2' to='/'>Home </Link>

            <Link type='button' className='btn btn-primary m-2' to='/login'>Login </Link>

            <Link type='button' className='btn btn-primary m-2' to='/register'>Register </Link>

            <Link type='button' className='btn btn-primary m-2' to='/books/new'>New Book </Link>

            <Link type='button' className='btn btn-primary m-2' onClick={() => localStorage.removeItem('token')} to='/login'>Signout </Link>

        </div>
    )
}

interface INavbarProps { }

export default Navbar