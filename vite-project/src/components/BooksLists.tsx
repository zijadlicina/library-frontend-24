import React from 'react'
import { author } from '../services/library/author'
import "../styles/authorsLists.css"
import Images from "../assets"
import { Book } from '../services/library/book'
import { useNavigate } from 'react-router-dom'

interface AuthorsListsProps {
    booksLists: Book[],
    setActiveItem: any
}

const BooksLists: React.FC<AuthorsListsProps> = ({booksLists, setActiveItem}) => {
    const navigate = useNavigate()
  return (
    <div className='authorsListDiv'>
        <h3 className='authorsListHeader'>Authors of this book: </h3>
        {booksLists.map((it, id) => {
            return <div className='authorsListItem' onClick={() => {
                setActiveItem("books")
                navigate("/books/" + it.isbn)
            }}>
                <img  className='authorsListImage' style={{width: "60px", height: "40px"}} src={Images.bookAvatar} alt="book avatar" />
                <span style={{marginLeft: "2%"}}>{it.title}</span>
            </div>
        })}
    </div>
  )
}

export default BooksLists