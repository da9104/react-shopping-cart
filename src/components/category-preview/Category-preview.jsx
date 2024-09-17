import { Link } from 'react-router-dom'
import ProductCard from "../product-card/product-card.component"
// import './category-preview.styles.scss'

const CategoryPreview = ({ title, products }) => {
    return(
          <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-22 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl underline font-bold tracking-tight text-gray-900">
                <Link to={title} className="title">
                {title.toUpperCase()}
                </Link>
            </h2>


            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {
                  products.filter((_, index) => (index < 4))
                  .map((product) => <ProductCard key={product.id} product={product} />)
                }
            </div>

        </div>
    )
}

export default CategoryPreview