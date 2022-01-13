import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { APIService } from '../services/APIService';


const Navbar = (props: INavbarProps) => {
    const [isAuthed, setIsAuthed] = useState(false)
    const loc = useLocation();
    const nav = useNavigate();


    useEffect(() => {

        APIService('/auth/validate')
            .then(res => {

                const tokenStatus = res.message === 'valid';
                console.log({ tokenStatus });
                setIsAuthed(tokenStatus)

            })
            .catch(e => {
                // console.log(e)

            })

    }, [loc.pathname])


    const Signout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        localStorage.removeItem('token')
        alert('you are now signed out');
        setIsAuthed(false);
        nav('/login');

    }



    return (
        <div className='bg-success'>
            <Link type='button' className='btn btn-primary m-2' to='/'>Home </Link>
            {!isAuthed &&

                <Link type='button' className='btn btn-primary m-2' to='/login'>Login </Link>
            }
            {!isAuthed &&

                <Link type='button' className='btn btn-primary m-2' to='/register'>Register </Link>
            }
            {isAuthed &&
                <Link type='button' className='btn btn-primary m-2' to='/books/new'>New Book </Link>
            }
            {isAuthed &&

                //! change link to button
                <button type='button' className='btn btn-primary m-2' onClick={Signout} >Signout </button>
            }
        </div>
    )
}

interface INavbarProps { }

export default Navbar