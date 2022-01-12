import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { APIService } from '../services/APIService'

const Home = () => {
    const [isAuthed, setIsAuthed] = useState(false)


    useEffect(() => {

        APIService('/auth/validate')
            .then(res => {

                const tokenStatus = res.message === 'valid';
                console.log({ tokenStatus });
                setIsAuthed(tokenStatus)

            })
            .catch(e => {
                console.log(e)
            })

    }, [])


    return (
        <div className="row m-2 justify-content-center">
            <h1 className="row my-5 m-2 ">Welcome to the bookstore</h1>
            <Link type='button' className='row btn btn-primary m-2' to='/books'> Check out the books</Link>
            {!isAuthed &&
                <Link type='button' className='row btn btn-primary m-2' to='/register'> Register Here</Link>
            }
            {!isAuthed &&

                <Link type='button' className='row btn btn-primary m-2' to='/login'> Login</Link>
            }


        </div>
    )
}

export default Home
