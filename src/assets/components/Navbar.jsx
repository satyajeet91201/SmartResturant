import { RiAppleFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaBell } from "react-icons/fa";
import { FaGlassMartini } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";

const Navbar =()=> {
    return (
        <>
  <nav className="navbar">
    <div className="navbar-left">
        <div className="apple">
    <IoFastFoodSharp className="apple2"/>
    </div>
      <span className="logo">Smart Restaurant Manager</span>
    </div>
    <div className="navbar-right">
      <ul className="nav-links">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Orders</a></li>
        <li><a href="#">Admin</a></li>
      </ul>
      <div className="icons">
        <span className="icon bell "><CgProfile className="apple2"></CgProfile></span>
        <span className="icon profile dark "><FaBell className="apple2"/></span>
      </div>
    </div>
    </nav>
    <hr className="hr"/>
  </>
  )  
}

export default Navbar;