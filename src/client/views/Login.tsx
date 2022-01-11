import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { APIService } from '../services/APIService'

const Login = () => {

    let nav = useNavigate()

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")



    // submit button
    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        // * input val
        if (!userEmail || !userPassword) return alert('fill out all fields');



        APIService("/auth/login", 'POST', {
            email: userEmail,
            password: userPassword

        })
            .then(data => {

                alert('Welcome Back!')

                localStorage.setItem('token', data.token)
                nav(`/books`)

            })
            .catch(e => {
                alert('Invalid credentials!')
                console.log(e)
            })


    }



    return (
        <div>
            <main className="container my-5">
                <section className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header"> You're about to enter our amazing bookstore!</div>

                            <div className="card-body">
                                <h1 className='m-2'>Enter your info below... </h1>
                                <form className="form-group m-2">

                                    <label>Email:</label>

                                    <input className="form-control"
                                        value={userEmail}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)} />

                                    <label>Password:</label>

                                    <input className="form-control"
                                        type='password'
                                        value={userPassword}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)} />
                                </form>
                                <button className='btn btn-primary m-2' onClick={handleSubmitButton} >Login </button>


                            </div>
                        </div>
                    </div>
                </section>
            </main>


        </div>
    )
}

export default Login
