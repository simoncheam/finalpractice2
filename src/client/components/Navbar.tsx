import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { APIService } from '../services/APIService';


const Navbar = (props: INavbarProps) => {
    const [isAuthed, setIsAuthed] = useState(false)
    const loc = useLocation();


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

                <Link type='button' className='btn btn-primary m-2' onClick={() => { localStorage.removeItem('token'); location.reload() }} to='/login'>Signout </Link>
            }
        </div>
    )
}

interface INavbarProps { }

export default Navbar