import './Navbar.css';
import {Link} from 'react-router-dom';

const Navbar = ({click}) => {

    return (
        <nav className="navbar">
            <div className="navbar__logo"> 
                
            <Link to="/">
                <div className="toHome">
                    <h2>Yoo-Chopz</h2>
                </div> 
            </Link>
            <Link to="/home">
                <div className="toHome">
                    <h2>POS</h2>
                </div> 
            </Link>
            <Link to="/orders">   
                <div className="toTable">
                    <h2>Table</h2>
                </div>
            </Link>
            </div>
            
            <div className="nav_search">
                <p className="homescreen_title ">.</p>
               <p><i className="fas fa-search"></i> <input type="text" placeholder='Search'/></p>
                
           </div>
            <div className="hamburger__menu" onClick={click}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav >
    )
}

export default Navbar
