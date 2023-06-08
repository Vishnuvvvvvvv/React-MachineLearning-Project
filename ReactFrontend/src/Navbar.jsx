import React ,{useContext}from 'react';
import { Link,useNavigate } from 'react-router-dom';
import "./Navbar.css"
import { SearchContext } from './SearchContext';

const Navbar = () => {
const navigate = useNavigate()


const { setSearchedMoveDetails } = useContext(SearchContext);

  function homeHandler() {
    setSearchedMoveDetails('');
    console.log('Clicked');
  }



  return (<>
    <nav className="navbar">

      <div className="navbar-link">
        <Link to="/" onClick={homeHandler}className="link-style">>Home</Link>
      </div>

      <div className="navbar-title">
        <h2>Movie Title</h2>
      </div>

      <div className="navbar-link">
        <Link to="/demo"className="link-style">>Predict</Link>
      </div>

    </nav>
  
</>
  );
};

export default Navbar;
