import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import AuthorsLists from "../components/AuthorsLists"

import { author } from "../services/library/author"
import { Book, getOneBook } from "../services/library/book"
import { getAuthorsOfBook } from "../services/library/authorBook"
import "../styles/itemDetail.css"
import { IoArrowBackSharp } from "react-icons/io5";
import { EditButton, DeleteButton } from "../components"
import { ToastContainer } from "react-toastify"

interface BookDetailProps {
  setActiveItem: any
}

const BookDetail: React.FC<BookDetailProps> = ({setActiveItem}) => {
  const navigate = useNavigate()
    const [bookItem, setBookItem] = useState<Book>()
    const [authorsBook, setAuthorsBook] = useState<author[]>([])
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<String>("")
  
    useEffect(() => {
      const fetchItem = async (): Promise<void> => {
        setIsLoading(true)
        try {
          const resBook: any = await getOneBook(id!)
          const resAuthorsBook: any = await getAuthorsOfBook(id!)
          setBookItem(resBook.data[0])
          if (resAuthorsBook.data.message !== "This book don't have author") setAuthorsBook(resAuthorsBook.data) 
        } catch (error: any) {
          setError(error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchItem()
    }, [])
  
    if (isLoading) return <p>Loading...</p>
    return (
      <div className="divItems">
        <ToastContainer />
        <div className="divBack" onClick={() => {
          navigate("/books")
        }}>
          <IoArrowBackSharp className="backIcon"/>
          <span className="backText">Back</span> 
        </div>
        <h1 className='detailItemHeader textHeader'>Book: 
             <span className="textHeaderValue">{bookItem?.title}</span>
            <EditButton id={bookItem?.isbn.toString() || ""} label="book" obj={bookItem}/>
            <DeleteButton id={bookItem?.isbn.toString() || ""} label="book"/>
        </h1>
          <div className="detailInfoDiv">
            <div className="detailInfoDiv-row">
              <div className="detailInfoDiv-row-label">
                Pages
              </div>
              <div className="detailInfoDiv-row-value">
                {bookItem?.pages ? bookItem?.pages.toString() : ""}
              </div>
            </div>
          <div className="detailInfoDiv-row">
              <div className="detailInfoDiv-row-label">
                Published
              </div>
              <div className="detailInfoDiv-row-value">
                {bookItem?.published ? bookItem?.published.toString() + " year" : ""}
              </div>
          </div>
        </div>
        {authorsBook.length === 0 ? <p className="detailInfoDiv-row-message">This book don't have authors</p> : 
            <AuthorsLists authorsBook={authorsBook} setActiveItem={setActiveItem}/>
        } 
      </div>
    )
  }
  
  export default BookDetail