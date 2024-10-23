import { useEffect, useState } from 'react'
import "../styles/itemNew.css"
import { Book, createOneBookAttachToAuthor } from '../services/library/book'
import { useNavigate } from 'react-router-dom'
import { IoArrowBackSharp } from 'react-icons/io5'
import { author, getAllAuthors } from '../services/library/author'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify';
import { isValidPages, isValidPublished, isValidTitle } from '../utilities'

const NewBook = () => {
  const navigate = useNavigate()
    const [title, setTitle] = useState({value: "", validation: false})
    const [pages, setPages] = useState({value: "", validation: false})
    const [published, setPublished] = useState({value: "", validation: false})
    const [image, setImage] = useState({value: "", validation: false})
    const [fieldAuthor, setFieldAuthor] = useState({value: "", validation: false})
    const [authorsLists, setAuthorsLists] = useState([])
    const [book, setBook] = useState<Book | null>()
    const [error, setError] = useState(false)

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
      if (title.validation && pages.validation && published.validation && fieldAuthor.validation){
        const  postBook = async () => {
          let res = await createOneBookAttachToAuthor(newBook, fieldAuthor.value)
        }
        toast.promise(postBook, {
          pending: 'Loading',
          success: 'Sucussfully created new book',
          error: 'Error when creating new book',
       })
       setTitle({value: "", validation: false})
       setPages({value: "", validation: false})
       setPublished({value: "", validation: false})
       setImage({value: "", validation: false})
       setFieldAuthor({value: "", validation: false})
       setBook(null)
      } 
  }

  useEffect(() => {
    const fetchAuthors = async (): Promise<void> => {
      try {
        const results: any = await getAllAuthors()
        setAuthorsLists(results.data)
      } catch (error: any) {
        setError(error)
      } 
    }
    fetchAuthors()
  }, [])

  const handleFieldAuthors = (e: any) => {
    setFieldAuthor(({value: e.target.value, validation: true}))
  }

  return (
    <div className='itemNewDiv'>
      <ToastContainer />
       <div className="divBack" onClick={() => {
          navigate("/books")
        }}>
          <IoArrowBackSharp className="backIcon"/>
          <span className="backText">Back</span> 
        </div>
        <h1 className='textHeader'>Add new book:</h1>
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
          <div className='itemNewFormRow'>
            <div className='itemNewFormRowLabel'>
              Select an author
            </div>
            <span className='itemNewFormRowValue'>
             <select className='itemNewFormRowSelect' value={fieldAuthor.value}  name='author' onChange={handleFieldAuthors}
               > 
               <option value="">Choose an author</option>
                {authorsLists.map((it: author, id) => {
                  return <option value={it.guid.toString()} key={id}>{it.firstName} {it.lastName}</option>
                })}
            </select>
            {book && !fieldAuthor.validation ? <span className='itemNewFormRowMessage'>
              *Invalid input: please select one author</span> : null}
            </span>
          </div>
          <div className='itemNewFormRowSubmit'>
            <button className='itemNewFormRowButton' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
    </div>
  )
}

export default NewBook


