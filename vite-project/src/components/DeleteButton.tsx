import { MdOutlineDelete } from 'react-icons/md'
import { removeOneBook } from '../services/library/book'
import { removeOneAuthor } from '../services/library/author'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface DeleteButtonProps {
  id: string,
  label: string
}

const DeleteButton : React.FC<DeleteButtonProps> = ({id, label}) => {
  const navigate = useNavigate()
  const handleRemove = () => {
    if (label === "author"){
      const removeAuthor = async () => {
        await removeOneAuthor(id)
      }
      toast.promise(removeAuthor, {
        pending: 'Loading',
        success: 'Sucussfully removed an author',
        error: 'Error while removing author',
     })
     setTimeout(() => {
      navigate("/authors")
    }, 2000)
    } else {
      const removeBook = async () => {
        await removeOneBook(id)
      }
      toast.promise(removeBook, {
        pending: 'Loading',
        success: 'Sucussfully removed book',
        error: 'Error while removing book',
     })
      setTimeout(() => {
        navigate("/books")
      }, 2000)
    }
  }
  return (
    <span className="detailItem-delete detailItem" onClick={handleRemove}>
        <MdOutlineDelete className="detailItemIcon"/>
        <span className="detailItemText">Delete</span>
    </span>
  )
}

export default DeleteButton