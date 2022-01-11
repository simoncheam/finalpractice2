import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateWrapper from './components/PrivateWrapper';
import BookDetail from './views/BookDetail';
import Books from './views/Books';
import Edit from './views/Edit';
import Home from './views/Home';
import Login from './views/Login';
import NewBook from './views/NewBook';
import Register from './views/Register';


const App = (props: AppProps) => {




	return (
		<BrowserRouter>
			<Navbar />

			<div className="container">
				<Routes>


					{/* Home */}
					<Route path="/" element={< Home />}>Home</Route>

					{/* Register */}
					<Route path="/register" element={<Register />}></Route>

					{/* Login */}
					<Route path="/login" element={<Login />}></Route>

					{/*Edit book  */} // private

					{/*Books Detail  */}
					<Route path="/books/:id" element={<BookDetail />}></Route>


					{/*Books  */}
					<Route path="/books" element={<Books />}></Route>

					// ! setup PRIVATE routes and wrapper

					{/* create, update, delete routes need to be private */}
					<Route path="/" element={<PrivateWrapper />}>
						<Route path='secret1' />

						{/*Create new book  */}
						<Route path="books/new" element={<NewBook />} />
						<Route path="books/:id/update" element={<Edit />}></Route>

					</Route>


					{/* NotFound */}
					{/* <Route path="*" element={<NotFound />}></Route> */}



				</Routes>



			</div>
		</BrowserRouter>

	);
};

interface AppProps { }



export default App;

