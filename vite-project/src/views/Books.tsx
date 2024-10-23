import { useEffect, useState } from 'react'
import { Book, getAllBooks } from '../services/library/book'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/items.css"

const Books = () => {
  const navigate = useNavigate()
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<String>("")

  useEffect(() => {
    const fetchBooks = async (): Promise<void> => {
      setIsLoading(true)
      try {
        const results: any = await getAllBooks()
        setBooks(results.data)
      } catch (error: any) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBooks()
  }, [])

  if (isLoading) return <div>Loading...</div>
  return (
    <div className="divItems">
      <div className='headerItems'>
        <h1 className='textHeader'>Books in Library</h1>
        <div className='addItem' onClick={() => {
          navigate("/books/new")
        }}>Add Book +</div>
      </div>
        <div className='itemsTable'>
        {books.map((it: Book, id) => 
          <Link className='perItemTable' to={`/books/${it.isbn}`} key={id}>
              <span className='titleItem'>{it.title}</span>
              {calculateYearAgo(it.published) === "0"  ?
              <span className='yearItem'>this year published</span>
              : <span className='yearItem'>Published {calculateYearAgo(it.published)} years ago</span> }
          </Link> 
        )}
        </div>
    </div>
  )
}

export default Books

const calculateYearAgo = (publishedYear: Number): string => {
  let y = 2024 - Number(publishedYear);
  return y.toString()
}