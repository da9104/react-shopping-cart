import { useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import BrandLogo from '../assets/crown.svg'
import { UserContext } from "../contexts/user.context"
import { signOutUser } from '../utils/firebase/firebase.utils'
import CartIcon from "../components/cart-icon/Cart-icon"
import CartDropdown from "../components/cart-dropdown/Cart-dropdown"
import { CartContext } from "../contexts/cart.context"
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from '../styles/navigation.styles'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    return (
     <>
         <NavigationContainer>
            <LogoContainer>
               <Link to='/'> <BrandLogo alt="logo"/> </Link>
             </LogoContainer>
            <NavLinks>
                <NavLink className="nav-link" to='/'>Home</NavLink>
                <NavLink className="nav-link" to='/shop'>Shop</NavLink>
                <NavLink className="nav-link" to=''>Sale</NavLink>
                <NavLink className="nav-link">Contact</NavLink>
                {
                    currentUser ? ( 
                    <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                    ) : (
                      <NavLink to="/auth">Sign In</NavLink>
                      )
                }
                 <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
         </NavigationContainer>
        <Outlet />
     </>
    )
}

export default Navigation