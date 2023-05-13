import { Link } from 'react-router-dom';
import * as userService from '../../utilities/services/users'
import MinLogo from '../Logo/MinLogo';
export default function NavBar({ user, setUser }) {
  function handleLogOut(){
    userService.logOut()
    setUser(null)
  }

  return (
    <nav className='navbar'>
      <MinLogo />
      &nbsp; &nbsp;
      
      &nbsp; &nbsp; <Link to="" onClick={handleLogOut}>Log Out</Link>

    </nav>
  );
}