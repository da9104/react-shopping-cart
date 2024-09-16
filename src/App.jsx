import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home.component'
import Navigation from './routes/Navigation.component'
import Authentication from './components/authentication/Authentication.component'
import { CartProvider } from './contexts/cart.context'
import Shop from './routes/shop/shop.component'
import Checkout from './components/checkout/checkout.component'
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        console.log(user)
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
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

  )
}

export default App