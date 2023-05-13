import { Link } from 'react-router-dom'
import Logo from '../../assets/Logos/Minimalistic logo dark theme.svg'
import './MinLogo.css'
export default function MinLogo() {
    return (
        <Link to={'/'} >
            <img src={Logo} className='MinLogo' alt="MinLogo" />
        </Link>
        
    )
}