import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeCartItem, inQuantity, decQuantity, emptyCart } from '../redux/slices/cartSlice'



const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const myCart = useSelector(state => state.cartReducer)
  // console.log(myCart);
  
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    if (myCart.length > 0) {
      setCartTotal(myCart?.map(item => item.totalPrice)?.reduce((a, b) => a + b))
    }
  }, [myCart])


  const handleDecrementProduct = (product) => {
    if (product.quantity > 1) {
      dispatch(decQuantity(product.id))
    } else {
      dispatch(removeCartItem(product.id))
    }
  }


  const handleCheckOut = () => {
    dispatch(emptyCart())
    alert("Order placed succesfully!!!ThankYou for purchasing with us.....")
    navigate('/')
  }
  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }} className='container mx-auto px-14'>
        {
          myCart.length > 0 ?
            <>
              <h1 className="font-bold text-3x1 mb-5 text-red-500">Cart Summary</h1>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 border rounded p-5 shadow">
                  <table className='table-auto w-full'>
                    <thead>
                      <tr>
                        <td className='font-semibold'>#</td>
                        <td className='font-semibold'>Name</td>
                        <td className='font-semibold'>Image</td>
                        <td className='font-semibold'>quantity</td>
                        <td className='font-semibold'>price</td>
                        <td className='font-semibold'>...</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        myCart.map((product, index) => (
                          <tr key={product?.id}>
                            <td >{index + 1}</td>
                            <td >{product?.title}</td>
                            <td ><img width={'70px'} height={'70px'} src={product?.name} alt="" /></td>
                            <td >
                              <div className='flex'>
                                <button onClick={() => handleDecrementProduct(product)} className="font-bold">-</button>
                                <input style={{ width: "40px" }} className='border rounded p-1 me-1 ms-1' value={product?.quantity} type="text" readOnly />
                                <button onClick={() => dispatch(inQuantity(product?.id))} className="font-bold">+</button>
                              </div>
                            </td>
                            <td >${product?.totalPrice}</td>
                            <td > <button onClick={() => dispatch(removeCartItem(product.id))}><i className="fa-solid fa-trash text-red-600"></i></button></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                  <div className="float-right mt-4">
                    <button onClick={() => dispatch(emptyCart())} className='bg-red-400 text-white rounded p-3 me-3'>EMPTY CART</button>
                    <Link to={'/'} className='bg-blue-700 text-white rounded p-3 me-3'>SHOP MORE</Link>

                  </div></div>
                <div className='border rounded shadow p-5'>
                  <h1 className="text-2xl font-bold">Total Amount:<span className='text-red-400'>${cartTotal}</span></h1>
                  <hr />
                  <button onClick={handleCheckOut} className='w-full bg-green-400 text-white rounded p-5 font-bold mt-5'> Checkout</button>
                </div>
              </div>

            </>
            :
            <div style={{ height: "100vh" }} className='flex flex-col items-center justify-center w-full'><img src='https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif' />
              <h1 className="text-3xl font-bold text-blue-800">your cart is empty</h1>
            </div>
        }

      </div>

    </>
  )
}

export default Cart