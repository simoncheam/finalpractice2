import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router';
import { Books, Categories } from '../client_types';
import { APIService } from '../services/APIService'


const NewBook = () => {

    const nav = useNavigate();
    let params = useParams();

    const [selectedCatergoryId, setsSelectedCatergoryId] = useState<number>(0);
    const [author, setAuthor] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<number>(0);

    const [categories, setCategories] = useState<Categories[]>([])

    useEffect(() => {

        //API stuff - get categories
        APIService(`/api/categories`)
            .then(data => {
                setCategories(data)
            })
            .catch(e =>
                console.log(e)
            );


    }, [])

    const handleCategoryIdSelectUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => { setsSelectedCatergoryId(Number(e.target.value)) }
    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // ! input val
        if (!selectedCatergoryId || !title || !author || !price) return alert('Fill out all fields please:)')

        APIService(`/api/books`, 'POST', {

            categoryid: selectedCatergoryId,
            title: title,
            author: author,
            price: price

        })
            .then(data => {
                console.log({ data });
                alert('Looks like a great book!')
                nav(`/books`)

            })
            .catch(e => {
                console.log(e)
            })


    }










    return (
        <div>
            {/* <h1>create new book</h1> */}

            <main className="container my-5">
                <section className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-header"> Ready to add your book to the store?📚 </div>

                            <div className="card-body">
                                <h1>Complete the fields below to begin: </h1>
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
                                    <input type='text' className="form-control"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)} value={author}
                                    />

                                    {/* // title */}
                                    <label className='row m-2'>Title:</label>
                                    <input type='text' className="form-control"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} value={title}
                                    />

                                    {/* // price */}
                                    <label className='row m-2'>Price:</label>
                                    <input type='text' className="form-control"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))} value={price}
                                    />

                                    <button className='btn btn-success my-5'
                                        onClick={handleSubmitButton}> Add Book!
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

export default NewBook

