import { Link } from 'react-router-dom';
import * as userService from '../../utilities/services/users'
import MinLogo from '../Logo/MinLogo';
export default function NavBar({ user, setUser }) {
  function handleLogOut(){
    userService.logOut()
    setUser(null)
  }

  return (
    <nav>
      <MinLogo />
      &nbsp; &nbsp;
      <span className="name">Hey there {user.username}!</span>
      &nbsp; &nbsp; <Link to="" onClick={handleLogOut}>Log Out</Link>

    </nav>
  );
}