import './index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Signup from './components/signup/signup';
import Signin from './components/signin/signin'
import Resetpassword from './components/reset/reset'
import Changepassword from './components/change/change'
import Cart from './components/cart/cart'
import Dashboard from './components/dashboard/dashboard';
import Payment from './components/payment/payment'
import Checkout  from './components/checkout/checkout';
//import { CartProvider } from './components/js file/cartContext';
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/reset' element={<Resetpassword />} />
        <Route path='/change' element={<Changepassword />} />
        <Route path='/cart' element={<Cart />} />
		    <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
