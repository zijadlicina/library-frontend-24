import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Books, Authors, AuthorDetail, BookDetail, NewBook, NewAuthor, EditBook, EditAuthor } from './views'
import { Navbar } from './components'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
  const [activeItem, setActiveItem] = useState("books")
  return (
    <BrowserRouter>
    <ToastContainer />
    <Navbar activeItem={activeItem} setActiveItem={setActiveItem}/>
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/books' element={<Books />} />
        <Route path='/books/:id' element={<BookDetail setActiveItem={setActiveItem}/>} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/authors/:id' element={<AuthorDetail setActiveItem={setActiveItem}/>} />
        <Route path="/books/new" element={<NewBook />} />
        <Route path="/authors/new" element={<NewAuthor />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/authors/edit/:id" element={<EditAuthor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
