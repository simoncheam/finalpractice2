import e from 'express'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { APIService } from '../services/APIService';


const Register = () => {

    let nav = useNavigate()

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        // * input val
        if (!userName || !userEmail || !userPassword) return alert('fill out all fields');



        APIService("/auth/register", 'POST', {
            name: userName,
            email: userEmail,
            password: userPassword

        })
            .then(data => {

                alert('Welcome!')

                localStorage.setItem('token', data.token)
                nav(`/`)

            })
            .catch(e => {
                console.log(e)
            })


    }







    return (
        <div>
            <h1 className="display-3 m-3 text-center" >Register Here </h1>
            <div className="row m-5 justify-content-center" >
                <div className="form-group col-6">


                    <input type="text"
                        value={userName}
                        placeholder='username'
                        className='form-control m-2'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                    />


                    <input type="text"
                        value={userEmail}
                        placeholder='username'
                        className='form-control m-2'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
                    />

                    <input type="password"
                        value={userPassword}
                        placeholder='password'
                        className='form-control m-2'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserPassword(e.target.value)}
                    />



                    <button className='btn btn-primary' onClick={handleSubmitButton} >Click to Register</button>
                </div>
            </div>
        </div>
    )
}

export default Register
