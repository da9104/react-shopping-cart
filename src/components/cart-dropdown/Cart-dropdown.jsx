import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/cart.context.jsx'
import Button from '../button/Button.component.jsx'
import CartItem from '../cart-item/cart.item.jsx'
import { CartDropdownContainer, EmptyMessage, CartItems } from './Cart-dropdown.styles'
import { CategoriesContext } from '../../contexts/categories.context.jsx'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    const { categoriesMap } = useContext(CategoriesContext)
    const navigate = useNavigate()

    const checkoutHandler = () => navigate('/checkout')

    console.log(categoriesMap)

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item) => (<CartItem key={item.id} cartItem={item}/>)))
                    : (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
            </CartItems>
                <Button onClick={checkoutHandler} style={{ fontSize: '9px' }}>Go To Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown