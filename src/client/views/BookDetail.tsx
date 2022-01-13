import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Books, Categories } from '../client_types';
import { APIService } from '../services/APIService';


const BookDetail = () => {

    let params = useParams();
    const book_id = params.id
    const nav = useNavigate();

    const [book, setBook] = useState<Books>()
    const [category, setCategory] = useState<Categories>()
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    useEffect(() => {

        //API stuff
        APIService(`/api/books/${book_id}`, 'GET', {

        })
            .then(data => {
                setBook(data)
                setIsLoaded(true);

                APIService(`/api/categories/${book.categoryid}`, 'GET', {

                })
                    .then(data => {
                        setCategory(data)

                    })
            })

    }, [isLoaded])


    // ! Delete function

    const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (confirm('are you sure?')) {


            APIService(`/api/books/${book_id}`, 'DELETE', {
            })
                .then(data => {

                    alert('Book deleted!');
                    nav(`/books`)

                })
                .catch(e => {
                    console.log(e)
                })
        }
    }

    if (!book || !category) { return <> Loading...</> }

    return (
        <div>

            <div className="row justify-content-center m-2">
                <div className="col-md-6">
                    <h1>Book Detail</h1>
                    <div className="card shadow">
                        <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted"> {category.name}</h6>
                            <p className="card-text">Price: {book.price.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}</p>
                            <button onClick={() => nav(-1)} className="row btn btn-primary m-2">Go Back </button>
                            <Link to={`/books/${book_id}/update`} className="row btn btn-warning m-2">Edit </Link>
                            <button onClick={handleDeleteButton} className="row btn btn-danger m-2">Delete </button>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default BookDetail
