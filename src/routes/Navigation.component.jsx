import { useContext } from "react"
import { useSelector } from "react-redux"
import { Outlet, Link } from "react-router-dom"
import { signOutUser } from '../utils/firebase/firebase.utils'
import CartIcon from "../components/cart-icon/Cart-icon"
import CartDropdown from "../components/cart-dropdown/Cart-dropdown"
import { CartContext } from "../contexts/cart.context"
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from '../styles/navigation.styles'
import { selectCurrentUser } from "../store/user/user.selector"
import { Avatar, Dropdown, Navbar } from "flowbite-react";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
    const { isCartOpen } = useContext(CartContext)

    return (
     <>
       <Navbar fluid rounded>
        <Navbar.Brand href="/">
          {/* <img src="" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Shopping Carty
         </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
         <CartIcon />
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar size="xs" alt="User settings" rounded  className="lg:mr-0 sm:mr-4 hidden lg:block sm:hidden"/>
            }
          >
            <Dropdown.Header>
            { currentUser ? (<Link as='span' onClick={signOutUser}>Sign Out</Link>) 
                           : (<Link to='/auth' as='span' className="block text-sm">Sign In</Link>) }
              {/* <span className="block truncate text-sm font-medium">name@flowbite.com</span> */}
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            {/* <Dropdown.Divider /> */}
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Link to="/" active>
            Home
          </Link>
          <Link to="/shop">Shop</Link>
          <Link to="#">Sale</Link>
           {
            currentUser 
            ? ( 
               <Link as='span' onClick={signOutUser}>Sign Out</Link>
            ) : (
               <Link to="/auth">Sign In</Link>
             )
           }
        </Navbar.Collapse>
      </Navbar>
         <NavigationContainer>
            {isCartOpen && <CartDropdown />}
         </NavigationContainer>
        <Outlet />
     </>
    )
}

export default Navigation