import { Link } from 'react-router-dom'

// Images
import Logo from '../../assets/images/logo.svg'

// Styles
import styles from './NavBar.module.scss'

const NavBar = ({ user, handleSignOut }) => {

  // ! Event Handlers
  

  return (
    <>
      <nav className={styles.container}>
        <Link to='/'><img src={Logo} alt="A cute owl" /></Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          { user ?
            <>
              <li><Link to="/hoots">Hoots</Link></li>
              <li><Link to="/hoots/new">New Hoot</Link></li>
              <li><Link to="" onClick={handleSignOut}>Sign Out</Link></li>
            </>
            :
            <>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          }
        </ul>
      </nav>
    </>
  )
}
export default NavBar