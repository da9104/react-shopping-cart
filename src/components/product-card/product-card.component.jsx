import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './product-card.styles.scss'
import Button, { BUTTON_TYPE_CLASSES } from "../button/Button.component"

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product 
    const { addItemToCart } = useContext(CartContext)
    const addProductToCart = () => addItemToCart(product)

    return (
        <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img src={imageUrl} alt={`${name}`} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
            </div>

            <div className="mt-4 flex justify-between">
               <div>
                    <p className="text-sm font-medium text-gray-900">${price}</p>
                    <h3 className="text-sm text-gray-700">
                    <span className="inset-0">{name}</span>
                  </h3>
                </div>
                <Button 
                    className="absolute inset-x-0 bottom-14 invisible group-hover:visible"
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                    onClick={addProductToCart}
                    >Add to cart
                </Button>
            </div>
        </div>
    )
}

export default ProductCard