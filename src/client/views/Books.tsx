import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Books, BooksJoined } from '../client_types'
import { APIService } from '../services/APIService'

const Books = () => {

    const [books, setbooks] = useState<BooksJoined[]>([])

    useEffect(() => {
        APIService("/api/books", 'GET', {
        })
            .then(data => {
                data = data[0]
                setbooks(data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])



    return (
        <div className="row m-2 justify-content-center" >
            <h1 className="row justify-content-center">Featured Books</h1>
            <h3 className="row my-2 justify-content-center">Login to add yours today</h3>
            <div className=''>

                {books.map(book => (

                    <div key={`book-${book.book_id}`} className="row justify-content-center m-2">

                        <div className="col-md-6">
                            <div className="card shadow">
                                <div className="card-header"> {book.cat_name}</div>

                                <div className="card-body">

                                    <h1 className='m-2'>"{book.b_title}" </h1>

                                    <label className='row m-2' >Author:  {book.b_author}</label>

                                    <label className='row m-2'>Price:  {book.b_price.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })} </label>

                                    <Link to={`/books/${book.book_id}`} className='btn btn-primary'>Read more </Link>

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
