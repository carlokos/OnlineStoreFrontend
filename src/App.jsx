import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import NavBar from './components/NavBar/navbar'
import Home from './pages/productPage/productsPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductView from './pages/productView/productView'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'
import AddGoods from './pages/addGoods/addGoods'
import UserDetails from './pages/userDetails/userDetails'
import { ShoppingCartContext } from './components/cart/ShoppingCartContext'
import CartPage from './pages/cartPage/CartPage'

function App() {
  return (
    <>
      <ShoppingCartContext>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/productview/:id' element={<ProductView />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/addGoods' element={<AddGoods />} />
            <Route exact path='/profile' element={<UserDetails />} />
            <Route exacth path='/cart' element={<CartPage/>}/>
          </Routes>
        </Router>
      </ShoppingCartContext>
    </>
  )
}

export default App
