import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Books, Categories } from '../client_types';
import { APIService } from '../services/APIService';

const Edit = () => {

    const nav = useNavigate();
    let params = useParams();
    const book_id = params.id;

    const [selectedCatergoryId, setsSelectedCatergoryId] = useState<number>(0);
    const [author, setAuthor] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<number>(0);

    const [categories, setCategories] = useState<Categories[]>([])
    const [book, setBook] = useState<Books>()


    useEffect(() => {

        //API stuff
        APIService(`/api/categories`)
            .then(data => {
                setCategories(data)
            })
            .catch(e =>
                console.log(e)
            );

        APIService(`/api/books/${book_id}`)
            .then((data: Books) => {
                setBook(data)
                setTitle(data.title)
                setAuthor(data.author)
                setPrice(data.price)
                setsSelectedCatergoryId(data.categoryid)
            })
            .catch(e =>
                console.log(e)
            );


    }, [])

    if (!book) { return <> Loading...</> }



    const handleCategoryIdSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setsSelectedCatergoryId(Number(e.target.value))
    }


    const handleUpdateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!selectedCatergoryId || !title || !author || !price) return alert('Update all fields please:)')

        APIService(`/api/books/${book_id}`, 'PUT', {

            categoryid: selectedCatergoryId,
            title: title,
            author: author,
            price: price

        })
            .then(data => {

                alert('Thanks for the update!')

                // localStorage.setItem('token', data.token)
                nav(`/books`)

            })
            .catch(e => {
                console.log(e)
            })
    }


    return (
        <div className=" m-2">
            <main>
                <section className='row justify-content-center'>
                    <div className="col-md-6">

                        <div className="card shadow mt-2">
                            <div className="card-header"> Got some edits? No problem.📚 </div>

                            <div className="card-body">
                                <h1>Update your book below: </h1>
                                <div className="form-group m-2">

                                    <label className='row m-2'>Select Category:</label>

                                    {/* // * select menu ! */}

                                    <select value={selectedCatergoryId} onChange={handleCategoryIdSelectUpdate} className='form-control'>

                                        {/* // * Options outer */}
                                        <option value={0} >Select a Category </option>

                                        {/* // * Maps through category array */}
                                        {categories.map(cat => (

                                            // * Options-inner: inside the mapped array

                                            <option key={`category-${cat.id}-${cat.name}`} value={cat.id}>
                                                {cat.name}
                                            </option>

                                        ))}
                                    </select>

                                    {/* // author */}
                                    <label className='row m-2'>Author:</label>
                                    <input type='text'
                                        className="form-control"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setAuthor(e.target.value)}
                                        value={author}
                                        placeholder={author}
                                    />

                                    {/* // title */}
                                    <label className='row m-2'>Title:</label>
                                    <input type='text'
                                        className="form-control"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setTitle(e.target.value)}
                                        value={title}
                                        placeholder={title}
                                    />

                                    {/* // price */}
                                    <label className='row m-2'>Price:</label>
                                    <input type='number'
                                        className="form-control"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setPrice(Number(e.target.value))}
                                        value={price}
                                    />


                                    <button onClick={() => nav(-1)} className='row btn btn-primary m-2' >Go Back</button>
                                    <button className='btn btn-success my-5'
                                        onClick={handleUpdateButton}> Update Book!
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </main>


        </div>
    )
}

export default Edit
