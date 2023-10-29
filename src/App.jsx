import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import NavBar from './components/NavBar/navbar'
import Home from './pages/productPage/productsPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductView from './pages/productView/productView'
import Login from './pages/login/login'
import SignUp from './pages/signup/signup'

function App() {
  return (
    <>
    <Router>
    <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/productview/:id' element={<ProductView/>} />
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
