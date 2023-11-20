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
import CartPage from './pages/cartPage/CartPage'
import OrderManager from './pages/OrderManager/OrderManager'
import Statistics from './pages/StatisticsPage/Statistics'

function App() {
  return (
    <>
      <Router>
          <NavBar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/productview/:id' element={<ProductView />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/addGoods' element={<AddGoods />} />
            <Route exact path='/profile' element={<UserDetails />} />
            <Route exacth path='/cart' element={<CartPage />} />
            <Route exact path='/orderManager' element={<OrderManager/>}/>
            <Route exact path='/statistics' element={<Statistics/>}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
