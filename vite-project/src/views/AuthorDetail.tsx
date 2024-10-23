import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import BooksLists from "../components/BooksLists"
import { Book } from "../services/library/book"
import { author, getOneAuthor } from "../services/library/author"
import { getAuthorsOfBook, getBooksOfAuthor } from "../services/library/authorBook"
import "../styles/itemDetail.css"
import { IoArrowBackSharp } from "react-icons/io5";
import { EditButton, DeleteButton } from "../components"
import { ToastContainer } from "react-toastify"

interface AuthorDetailProps {
  setActiveItem: any
}
const AuthorDetail: React.FC<AuthorDetailProps> = ({setActiveItem}) => {
  const navigate = useNavigate()
    const [authorItem, setAuthorItem] = useState<author>()
    const [booksAuthor, setBooksAuthor] = useState<Book[]>([])
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<String>("")
  
    useEffect(() => {
      const fetchItem = async (): Promise<void> => {
        setIsLoading(true)
        try {
          const resAuthor: any = await getOneAuthor(id!)
          const resBooksAuthor: any = await getBooksOfAuthor(id!)
          setAuthorItem(resAuthor.data[0])
          if (resBooksAuthor.data.message !== "This author don't have books") setBooksAuthor(resBooksAuthor.data) 
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
          navigate("/authors")
        }}>
          <IoArrowBackSharp className="backIcon"/>
          <span className="backText">Back</span> 
        </div>
        <h1 className='detailItemHeader textHeader'>Author: 
          <span className="textHeaderValue">{authorItem?.firstName} {authorItem?.lastName}</span>
            <EditButton id={authorItem?.guid.toString() || ""} label="author" obj={authorItem}/>
            <DeleteButton id={authorItem?.guid.toString() || ""} label="author"/>
        </h1>
          <div className="detailInfoDiv">
            <div className="detailInfoDiv-row">
              <div className="detailInfoDiv-row-label">
                First name
              </div>
              <div className="detailInfoDiv-row-value">
                {authorItem?.firstName}
              </div>
              <div className="detailInfoDiv-row-label">
                Last name
              </div>
              <div className="detailInfoDiv-row-value">
                {authorItem?.lastName}
              </div>
            </div>
          <div className="detailInfoDiv-row">
              <div className="detailInfoDiv-row-label">
                Date of birth
              </div>
              <div className="detailInfoDiv-row-value">
                {authorItem?.dob ? new Date(authorItem.dob.toString()).toISOString().split('T')[0] : ""}
              </div>
          </div>
        </div>
        {booksAuthor.length === 0 ? <p className="detailInfoDiv-row-message">This author don't have books</p> : 
            <BooksLists booksLists={booksAuthor} setActiveItem={setActiveItem}/>
        } 
      </div>
    )
  }
  
  export default AuthorDetail