import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../redux/slices/productSlice'

const Header = ({insideHome}) => {
  const dispatch =useDispatch()
  const myWishlist = useSelector(state=>state. wishlistReducer)
  const myCart = useSelector(state =>state.cartReducer)  
  return (
     <nav className='flex w-full bg-blue-950 fix top-0 p-5 items-center' >
      <Link className=' text-white font-bold ' to={'/'}><i class="fa-solid fa-truck-fast me-1"></i>food Cart</Link>
      <ul className='flex-1 text-right '>
       {insideHome && 
         <li className='list-none inline-block px-5 '><input onChange={e=>dispatch(searchProduct(e.target.value.toLocaleLowerCase() ))} style={{width:'300px'}} type="text" className='rounded-full p-1 text-center' placeholder='Sreach the recipes here!' /></li>
       }
        {/* <li  className='list-none inline-block px-5'><Link to={'/wishlist'} className='font-semibold  text-white' ><i class="fa-solid fa-heart  text-red-600 px-2"></i>Wishlist <span className='bg-yellow-100 ml-2  p-1 text-black rounded-full '>{myWishlist.length}</span></Link></li>
        <li  className='list-none inline-block px-5'><Link to={'/cart'} className='font-semibold text-white'><i class="fa-solid fa-cart-plus me-1 text-yellow-200 px-2"></i>Cart<span className='bg-yellow-300 ml-2 rounded-xl p-1 text-black'>{myCart.length}</span ></Link></li> */}

      </ul>
     </nav>
  )
}

export default Header