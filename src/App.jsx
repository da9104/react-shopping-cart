import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home.component'
import Navigation from './routes/Navigation.component'
import Authentication from './components/authentication/Authentication.component'
import { UserProvider } from './contexts/user.context'
import { CategoriesProvider } from './contexts/categories.context'
import { CartProvider } from './contexts/cart.context'
import Shop from './routes/shop/shop.component'
import Checkout from './components/checkout/checkout.component'

const App = () => {
  return (
  <UserProvider>
    <CategoriesProvider>
      <CartProvider>
        <Routes>
          <Route path='/' element={ <Navigation />} >
            <Route index element={ <Home />}/>
            <Route path='shop/*' element={ <Shop />} />
            <Route path='auth' element={ <Authentication />} />
            <Route path='checkout' element={ <Checkout />} />
          </Route>
        </Routes>
      </CartProvider>
    </CategoriesProvider>
  </UserProvider>
  )

}

export default App