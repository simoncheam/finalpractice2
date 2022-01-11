import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Books } from '../client_types'
import { APIService } from '../services/APIService'

const Books = () => {


    const [books, setbooks] = useState<Books[]>([])

    useEffect(() => {

        APIService("/api/books", 'GET', {
        })
            .then(data => {

                //set state books
                setbooks(data)

            })
            .catch(e => {
                console.log(e)
            })


    }, [])




    return (
        <div >
            <h1 className="row justify-content-center">Book Listing</h1>
            <div className=''>
                {books.map(book => (
                    <div key={`book-${book.id}`} className="row justify-content-center m-2">
                        <div className="col-md-6">
                            <div className="card shadow">
                                <div className="card-header"> {book.categoryid}</div>

                                <div className="card-body">
                                    <h1 className='m-2'>"{book.title}" </h1>

                                    <label className='row m-2' >Author:  {book.author}</label>



                                    <label className='row m-2'>Price:  {book.price.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })} </label>


                                    <Link to={`/books/${book.id}`} className='btn btn-primary'>Read more </Link>

                                </div>
                            </div>
                        </div>
                    </div>



                ))}
            </div>

        </div>
    )
}

export default Books
