import React, { useState } from 'react'
import Header from '../components/Header'
import { json, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'



const View = () => {
  const myCart = useSelector(state => state.cartReducer)
  const myWishlist = useSelector(state => state.wishlistReducer)
  const dispatch = useDispatch()
  const [product, setProduct] = useState({})
  const { id } = useParams()
  console.log(id);

  useEffect(() => {
    if (sessionStorage.getItem("allProducts")) {
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      setProduct(allProducts.find(item => item.id == id))
    }
  }, [])
  const handleWishlist = (product) => {
    if (myWishlist?.includes(product)) {
      alert("product alredy in your wishlist")
    } else {
      dispatch(addToWishlist(product))
    }
  }

  const handleAddToCart = (product) => {
    const existingProduct = myCart?.find(item => item.id == product.id)
    if (existingProduct) {
      dispatch(addToCart(product))
      alert("product quantity is incrementing!!")
    } else {
      dispatch(addToCart(product))
    }
  }







  return (
    <>
      <Header />
      <div style={{ minHeight: "90vh", width: "190vh" }} className="flex justify-center items-center mt-5">
        <div className="grid grid-cols-2 items-center">
          <img style={{ width: "70vh", height: "300px" }} src={product?.image} alt="" />
          <div>
            <h1>PID:{product?.id}</h1>
            <h1 className="text-3xl font-bold">  {product?.name} </h1>
            {/* <h4 className="text-bold text-red-500 text-xl"> ${product?.price}</h4> */}
            <p> <span className='font-bold'>Description:</span>{product?.ingredients}</p>
            {/* <div className="flex justify-between m-5">
              <button onClick={() => handleWishlist(product)} className="bg-blue-600 text-white p-2 rounded">ADD TO WISHLIST  <i class="fa-solid fa-heart"></i></button>
              <button onClick={() => handleAddToCart(product)} className="bg-green-600 text-white p-2 rounded">ADD TO CART  <i class="fa-solid fa-cart-shopping"></i></button>
            </div> */}
          </div>
        </div>
      </div>

    </>
  )
}

export default View