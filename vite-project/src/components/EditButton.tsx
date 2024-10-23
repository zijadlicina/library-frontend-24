import { MdEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { author } from "../services/library/author";
import { Book } from "../services/library/book";

interface EditButtonProps {
  id: string,
  label: string,
  obj: author | Book | undefined
}

const EditButton : React.FC<EditButtonProps> = ({obj, id, label}) => {
  const navigate = useNavigate()
  const handleEdit = () => {
    if (label === "author") navigate("/authors/edit/" + id) 
    else navigate("/books/edit/" + id)
  }
  
  return (
    <span className="detailItem-edit detailItem" onClick={() => handleEdit()}>
        <MdEditNote className="detailItemIcon"/>
        <span className="detailItemText">Edit</span>
    </span>
  )
}

export default EditButton