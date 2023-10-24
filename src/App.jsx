import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import NavBar from './components/navbar'
import Home from './pages/productsList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductView from './views/productView'
import Login from './pages/login'
import SignUp from './pages/signup'


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
