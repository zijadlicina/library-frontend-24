import { useEffect, useState } from 'react'
import "../styles/itemNew.css"
import { Book, getOneBook } from '../services/library/book'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackSharp } from 'react-icons/io5'
import { ToastContainer } from 'react-toastify';
import { EditBookInputs } from '../components'

const EditBook = () => {
  const navigate = useNavigate()
  const [bookItem, setBookItem] = useState<Book>()
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<String>("")
  const [title, setTitle] = useState({value: "", validation: false})
  const [pages, setPages] = useState({value: "", validation: false})
  const [published, setPublished] = useState({value: "", validation: false})
  const [image, setImage] = useState({value: "", validation: false})


  const setStates = async () => {
    setTitle({value: bookItem?.title as string, validation: true})
    setPages({value: bookItem?.pages.toString()!, validation: true})
    setPublished({value: bookItem?.published.toString()!, validation: true})
    setImage({value: bookItem?.image.toString()!, validation: true})
  }
  useEffect(() => {
      const fetchItem = async (): Promise<void> => {
        setIsLoading(true)
        try {
          const resBook: any = await getOneBook(id!)
          setBookItem(resBook.data[0])
        } catch (error: any) {
          setError(error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchItem()
    }, [])


    useEffect(() => {
      setStates()
    }, [bookItem])
  return (
    <div className='itemNewDiv'>
      <ToastContainer />
       <div className="divBack" onClick={() => {
          navigate("/books/" + id)
        }}>
          <IoArrowBackSharp className="backIcon"/>
          <span className="backText">Back</span> 
        </div>
        <h1 className='textHeader'>Edit book - ISBN: {bookItem?.isbn}</h1>
        {bookItem ? 
         <EditBookInputs id={id} image={image} setImage={setImage} pages={pages}
         setPages={setPages} published={published} setPublished={setPublished} 
         title={title} setTitle={setTitle}/> : null}
    </div>
  )
}

export default EditBook


