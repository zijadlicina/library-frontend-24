import { useEffect, useState } from 'react'
import { author, getOneAuthor } from '../services/library/author'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackSharp } from 'react-icons/io5'
import { ToastContainer } from 'react-toastify';
import { EditAuthorInputs } from '../components'

const EditAuthor = () => {
  const navigate = useNavigate()
  const [authorItem, setAuthorItem] = useState<author>()
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<String>("")
  const [firstName, setFirstName] = useState({value: "", validation: false})
  const [lastName, setLastName] = useState({value: "", validation: false})
  const [dob, setDob] = useState({value: "", validation: true})
  const [image, setImage] = useState({value: "", validation: false})


  const setStates = async () => {
    setFirstName({value: authorItem?.firstName as string, validation: true})
    setLastName({value: authorItem?.lastName.toString()!, validation: true})
    setDob({value: authorItem?.dob.toString()!, validation: true})
    setImage({value: authorItem?.image.toString()!, validation: true})
  }
  useEffect(() => {
      const fetchItem = async (): Promise<void> => {
        setIsLoading(true)
        try {
          const resBook: any = await getOneAuthor(id!)
          setAuthorItem(resBook.data[0])
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
    }, [authorItem])
  return (
    <div className='itemNewDiv'>
      <ToastContainer />
       <div className="divBack" onClick={() => {
          navigate("/authors/" + id)
        }}>
          <IoArrowBackSharp className="backIcon"/>
          <span className="backText">Back</span> 
        </div>
        <h1 className='textHeader'>Edit author - GUID: {authorItem?.guid}</h1>
        {authorItem ? 
         <EditAuthorInputs id={id} image={image} setImage={setImage} firstName={firstName}
        setLastName={setLastName} setDob={setDob} lastName={lastName} setFirstName={setFirstName}
        dob={dob}/> : null}
    </div>
  )
}

export default EditAuthor


