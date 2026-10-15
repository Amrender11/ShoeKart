import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import { Home } from './Screen/Home'
import { Login } from './Screen/Login'
import { Men } from './Screen/Men'
import { Brand } from './Screen/Brand'
import { Women } from './Screen/Women'
import Navbar from './Compnent/Navbar'
import { New } from './Screen/New Arrivals'
import { Sale } from './Screen/Sale'
import { Wishlist } from './Screen/Wishlist'
import ProductDetails from './Compnent/Detail - Product'
import Order from './Compnent/Order'
import AddToCart from './Compnent/Add to cart'
import MyOrder from './Compnent/Myorders'
import Register from './Compnent/Register'
import Login11 from './Compnent/Login'
import About from './Compnent/AboutUs'
import Contact from './Compnent/Contact'


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
       <Route path='/New' element={<New/>} />
       <Route path='/Men' element={<Men/>} />
       <Route path='/Sale' element={<Sale/>} />
       <Route path='/Login' element={<Login/>}/>
        <Route path='/Women' element={<Women/>}/>
        <Route path='/Wishlist' element={<Wishlist/>} />
      <Route  path="/ProductDetails" element={<ProductDetails />} />
      
<Route path="/Cart" element={<AddToCart />}/>
<Route path="/Order" element={<Order />} />
<Route path="/MyOrders" element={<MyOrder />} />
<Route path="/Register" element={<Register />} />
<Route path="/Login11" element={<Login11 />} />
<Route path="/About" element={<About />} />
<Route path="/Contact" element={<Contact />} />


      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
