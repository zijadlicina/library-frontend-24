import { useNavigate } from 'react-router-dom'
import "../styles/Navbar.css"

interface NavbarProps {
  activeItem: string,
  setActiveItem: any
}

const Navbar : React.FC<NavbarProps> = ({activeItem, setActiveItem}) => {
  const navigate = useNavigate();

  return (
    <nav className='navbarDiv'>
      <div className='navbarElements'>
        <span className={activeItem === "books" ? `activeNavbar navbarItem` : "navbarItem"} 
          onClick={() => {
            setActiveItem("books")
            navigate("/books")
          }}
        >Books</span>
        <span className={activeItem === "authors" ? `activeNavbar navbarItem` : "navbarItem"} 
        onClick={() => {
          setActiveItem("authors")
          navigate("/authors")
        }}>Authors</span>
      </div>
    </nav>
  )
}

export default Navbar