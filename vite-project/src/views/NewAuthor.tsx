import { useEffect, useState } from 'react'
import { author, createOneAuthorAttachToBook } from '../services/library/author'
import { useNavigate } from 'react-router-dom'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Book, getAllBooks } from '../services/library/book'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify';
import { isValidFirstName, isValidLastName, convertToValidSqlDate, isValidDate } from '../utilities'

const NewAuthor = () => {
  const navigate = useNavigate()
    const [firstName, setFirstName] = useState({value: "", validation: false})
    const [lastName, setLastName] = useState({value: "", validation: false})
    const [dob, setDob] = useState({value: "", validation: true})
    const [image, setImage] = useState({value: "", validation: false})
    const [fieldBook, setFieldBook] = useState({value: "", validation: false})
    const [booksLists, setBooksLists] = useState([])
    const [author, setAuthor] = useState<author | null>()
    const [error, setError] = useState(false)

    const handleSubmit = () => {
      let newAuthor: author = {
        guid: "",
        firstName: firstName.value,
        lastName: lastName.value,
        dob: convertToValidSqlDate(dob.value),
        image: image.value,
        books: []
      };
      setAuthor(newAuthor)
      if (firstName.validation && lastName.validation && dob.validation && fieldBook.validation){
        const postAuthor = async () => {
         await createOneAuthorAttachToBook(newAuthor, fieldBook.value)
        }
        toast.promise(postAuthor, {
          pending: 'Loading',
          success: 'Sucussfully created new author',
          error: 'Error when creating new author',
       })
       setFirstName({value: "", validation: false})
       setLastName({value: "", validation: false})
       setDob({value: "", validation: false})
       setImage({value: "", validation: false})
       setFieldBook({value: "", validation: false})
       setAuthor(null)
      } 
  }

  useEffect(() => {
    const fetchBooks = async (): Promise<void> => {
      try {
        const results: any = await getAllBooks()
        setBooksLists(results.data)
      } catch (error: any) {
        setError(error)
      } 
    }
    fetchBooks()
  }, [])

  const handleFieldAuthors = (e: any) => {
    setFieldBook(({value: e.target.value, validation: true}))
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
        <h1 className='textHeader'>Add new author:</h1>
        <div className='itemNewForm'>
          <div className='itemNewFormRow'>
            <div className='itemNewFormRowLabel'>
              First name
            </div>
            <span className='itemNewFormRowValue'>
              <input className='itemNewFormRowInput' type="text" name='firstName' value={firstName.value}
              onChange={(e) => {
                setFirstName({value: e.target.value, validation: isValidFirstName(e.target.value)})
            }}/>
              {author && !firstName.validation ? <span className='itemNewFormRowMessage'>*Invalid input: please ensure your input does not exceed 15 characters. </span> : null}
            </span>
          </div>
          <div className='itemNewFormRow'>
            <div className='itemNewFormRowLabel'>
                Last name
            </div>
            <span className='itemNewFormRowValue'>
              <input className='itemNewFormRowInput' type="text" name='lastName' value={lastName.value}
              onChange={(e) => {
                setLastName({value: e.target.value, validation: isValidLastName(e.target.value)})
            }}/>
              {author && !lastName.validation ? <span className='itemNewFormRowMessage'>*Invalid input: please ensure your input does not exceed 15 characters. </span> : null}
            </span>
          </div>
          <div className='itemNewFormRow'>
            <div className='itemNewFormRowLabel'>
                Date of birth
            </div>
            <span className='itemNewFormRowValue'>
              <input className='itemNewFormRowInput' type="date" name='dob' value={dob.value}
              onChange={(e) => {
                setDob({value: e.target.value, validation: isValidDate(new Date(e.target.value))})
            }}/>
              {author && !dob.validation ? <span className='itemNewFormRowMessage'>*Invalid input: please ensure your input is correct date. </span> : null}
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
              Select a book
            </div>
            <span className='itemNewFormRowValue'>
             <select className='itemNewFormRowSelect' value={fieldBook.value}  name='book' onChange={handleFieldAuthors}
               > 
               <option value="">Choose an author</option>
                {booksLists.map((it: Book, id) => {
                  return <option value={it.isbn.toString()} key={id}>{it.title}</option>
                })}
            </select>
            {author && !fieldBook.validation ? <span className='itemNewFormRowMessage'>
              *Invalid input: please select one book</span> : null}
            </span>
          </div>
          <div className='itemNewFormRowSubmit'>
            <button className='itemNewFormRowButton' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
    </div>
  )
}

export default NewAuthor


