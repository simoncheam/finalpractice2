import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {




    return (
        <div>
            <h1>Home - welcome to the bookstore</h1>
            <Link type='button' className='btn btn-primary m-2' to='/books'> Check out the books</Link>
            <Link type='button' className='btn btn-primary m-2' to='/register'> Register Here</Link>
            <Link type='button' className='btn btn-primary m-2' to='/login'> Login</Link>


        </div>
    )
}

export default Home
