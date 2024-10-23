import React, { useEffect, useState } from 'react'
import { author, updateOneAuthor } from '../services/library/author';
import { toast } from 'react-toastify';
import { isValidFirstName, isValidLastName, isValidDate, convertToValidSqlDate } from '../utilities';
import { useNavigate } from 'react-router-dom';

interface EditInputsProps {
    id: string |undefined, 
    firstName: any, lastName: any, dob: any, image: any, 
    setFirstName: any, setLastName: any, setDob: any, setImage: any
}

const EditAuthorInputs : React.FC<EditInputsProps> = ({id, firstName, lastName, dob, image, setFirstName, setLastName, setDob, setImage}) => {
    const [author, setAuthor] = useState<author | null>()
    const navigate = useNavigate();

    const handleSubmit = () => {
        let newAuthor: author = {
          guid: "",
          firstName: firstName.value,
          lastName: lastName.value,
          dob:  convertToValidSqlDate(dob.value),
          image: image.value,
          books: []
        };
        setAuthor(newAuthor)
        if (firstName.validation && lastName.validation && dob.validation){
          const updateAuthor = async () => {
          await updateOneAuthor(id!, newAuthor)
          }
          toast.promise(updateAuthor, {
            pending: 'Loading',
            success: 'Sucussfully updated an author',
            error: 'Error when we try update an author',
         })
         navigate("/authors/" + id)
        } 
    }

  return (
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
        <div className='itemNewFormRowSubmit'>
          <button className='itemNewFormRowButton' onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default EditAuthorInputs