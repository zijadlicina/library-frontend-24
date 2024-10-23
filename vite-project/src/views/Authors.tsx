import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { author, getAllAuthors } from '../services/library/author'

const Authors = () => {
  const navigate = useNavigate()
  const [authors, setAuthors] = useState<author[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<String>("")

  useEffect(() => {
    const fetchAuthors = async (): Promise<void> => {
      setIsLoading(true)
      try {
        const results: any = await getAllAuthors()
        setAuthors(results.data)
      } catch (error: any) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAuthors()
  }, [])

  if (isLoading) return <div>Loading...</div>
  return (
    <div className="divItems">
      <div className='headerItems'>
        <h1 className='textHeader'>Authors in Library</h1>
        <div className='addItem' onClick={() => {
          navigate("/authors/new")
        }}>Add Author +</div>
      </div>
        <div className='itemsTable'>
        {authors.map((it: author, id) => 
          <Link className='perItemTable' to={`/authors/${it.guid}`} key={id}>
              <span className='titleItem'>{it.firstName} {it.lastName}</span>
              <span className='yearItem'>Date of birth: {it.dob ? new Date(it.dob.toString()).toISOString().split('T')[0] : ""}</span>
          </Link> 
        )}
        </div>
    </div>
  )
}

export default Authors
