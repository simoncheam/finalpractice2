import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { APIService } from '../services/APIService';


const Navbar = (props: INavbarProps) => {
    const loc = useLocation();
    const [isAuthed, setIsAuthed] =useState(false);


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
        <div>
            <Link type='button' className='btn btn-primary' to='/'>Home </Link>
            
            <Link type='button' className='btn btn-primary' to='/login'>Login </Link>
            
            <Link type='button' className='btn btn-primary' to='/register'>Register </Link>
            
            <Link type='button' className='btn btn-primary' to='/books/new'>New Book </Link>

            <Link type='button' className='btn btn-primary' onClick={()=>localStorage.removeItem('token')} to='/login'>Signout </Link>
                      
        </div>
    )
}

interface INavbarProps {}

export default Navbar