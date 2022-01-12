import * as React from 'react';
import { Link } from 'react-router-dom';


const Navbar = (props: INavbarProps) => {



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