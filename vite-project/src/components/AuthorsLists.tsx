import React from 'react'
import { author } from '../services/library/author'
import "../styles/authorsLists.css"
import Images from "../assets"
import { useNavigate } from 'react-router-dom'

interface AuthorsListsProps {
    authorsBook: author[],
    setActiveItem: any
}

const AuthorsLists: React.FC<AuthorsListsProps> = ({authorsBook, setActiveItem}) => {
  const navigate = useNavigate()
  return (
    <div className='authorsListDiv'>
        <h3 className='authorsListHeader'>Books of this author: </h3>
        {authorsBook.map((it, id) => {
            return <div className='authorsListItem' onClick={() => {
              setActiveItem("authors")
              navigate("/authors/" + it.guid)
            }}>
                <img  className='authorsListImage' src={Images.authorAvatar} alt="author avatar" />
                <span className='authorsListText'>{it.firstName} {it.lastName}</span>
            </div>
        })}
    </div>
  )
}

export default AuthorsLists