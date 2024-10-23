import React, { useEffect, useState } from 'react'
import { Book, updateOneBook } from '../services/library/book';
import { toast } from 'react-toastify';
import { isValidPages, isValidPublished, isValidTitle } from '../utilities';
import { useNavigate } from 'react-router-dom';

interface EditInputsProps {
    id: string |undefined, 
    title: any, pages: any, published: any, image: any, 
    setTitle: any, setPages: any, setPublished: any, setImage: any
}

const EditBookInputs : React.FC<EditInputsProps> = ({id, title, pages, published, image, setTitle, setPages, setPublished, setImage}) => {
    const [book, setBook] = useState<Book | null>()
    const navigate = useNavigate();

    const handleSubmit = () => {
        let newBook: Book = {
          isbn: "",
          title: title.value,
          pages: parseInt(pages.value),
          published: parseInt(published.value),
          image: image.value,
          authors: []
        };
        setBook(newBook)
        if (title.validation && pages.validation && published.validation){
          const updateBook = async () => {
          await updateOneBook(id!, newBook)
          }
          toast.promise(updateBook, {
            pending: 'Loading',
            success: 'Sucussfully updated a book',
            error: 'Error when updated a book',
         })
         navigate("/books/" + id)
        } 
    }

  return (
    <div>
        <div className='itemNewForm'>
          <div className='itemNewFormRow'>
            <div className='itemNewFormRowLabel'>
              Title
            </div>
            <span className='itemNewFormRowValue'>
              <input className='itemNewFormRowInput' type="text" name='title' value={title.value}
              onChange={(e) => {
                setTitle({value: e.target.value, validation: isValidTitle(e.target.value)})
            }}/>
              {book && !title.validation ? <span className='itemNewFormRowMessage'>*Invalid input: please ensure your input contains at least 3 letter and does not exceed 15 characters. </span> : null}
            </span>
          </div>
          <div className='itemNewFormRow'>
            <div className='itemNewFormRowLabel'>
              Pages
            </div>
            <span className='itemNewFormRowValue'>
              <input className='itemNewFormRowInput' type="text" name='pages' value={pages.value}
            onChange={(e) => {
              setPages({value: e.target.value, validation: isValidPages(e.target.value)})
            }}/>
             {book && !pages.validation ? <span className='itemNewFormRowMessage'>
              *Invalid input: please ensure your input only number characters </span> : null}
            </span>
          </div>
          <div className='itemNewFormRow'>
            <div className='itemNewFormRowLabel'>
              Published
            </div>
            <span className='itemNewFormRowValue'>
              <input className='itemNewFormRowInput' type="text" name='published' value={published.value}
            onChange={(e) => {
              setPublished({value: e.target.value, validation: isValidPublished(e.target.value)})
            }}/>
            {book && !published.validation ? <span className='itemNewFormRowMessage'>
              *Invalid input: please ensure your input only positive number characters, and maximum number is 2024</span> : null}
            </span>
          </div>
          <div className='itemNewFormRow'>
            <div className='itemNewFormRowLabel'>
              Image <span>(Enter a URL link)</span>
            </div>
            <span className='itemNewFormRowValue'>
              <input className='itemNewFormRowInput' type="text" name='image' value={image.value}
            onChange={(e) => {
              setImage({value: e.target.value, validation: true})
            }}/>
            </span>
          </div>
        </div>

        <div className='itemNewFormRowSubmit'>
          <button className='itemNewFormRowButton' onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default EditBookInputs