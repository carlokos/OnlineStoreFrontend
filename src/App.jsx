import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import NavBar from './components/NavBar/navbar'
import Home from './pages/HomePage/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductView from './pages/productView/productView'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'
import AddGoods from './pages/addGoods/addGoods'
import UserDetails from './pages/userDetails/userDetails'
import CartPage from './pages/cartPage/CartPage'
import OrderManager from './pages/OrderManager/OrderManager'
import Statistics from './pages/StatisticsPage/Statistics'
import NotFound from './pages/NotFound/NotFound'
import ProtectedRoute from './ProtectedRoute'
import ProductList from './pages/productPage/productsPage';
import TopProducts from './pages/top10Products/topProducts'

function App() {
  return (
    <>
      <Router>
          <NavBar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/productList' element={<ProductList/>}/>
            <Route exact path='/productview/:id' element={<ProductView />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route path='*' element={<NotFound />} />
            <Route exact path='/topProducts' element={<TopProducts/>}/>
            <Route exacth path='/cart' element={<CartPage />} />

            <Route element={<ProtectedRoute needAdmin={true}/>}>
              <Route exact path='/addGoods' element={<AddGoods />} />
              <Route exact path='/orderManager' element={<OrderManager/>}/>
              <Route exact path='/statistics' element={<Statistics/>}/>
            </Route>

            <Route element={<ProtectedRoute needAdmin={false}/>}>
              <Route exact path='/profile' element={<UserDetails />} />
            </Route> 
          </Routes>
      </Router>
    </>
  )
}

export default App
