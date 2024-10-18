import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../redux/slices/productSlice'


const Home = () => {
    const dispatch = useDispatch()
    const { allProducts, loading, error } = useSelector(state => state.productReducer)
    const[currentPage,setCurrentPage]=useState(1)
    const productPerPage=8
    const totalPages=Math.ceil(allProducts?.length/productPerPage)

const currentPageLastProductIndex=currentPage*productPerPage
const currentPageStarttProductIndex=currentPageLastProductIndex-productPerPage
const visibleProductCards =allProducts.slice(currentPageStarttProductIndex,currentPageLastProductIndex)
    // console.log(allProducts);

    useEffect(() => {
        dispatch(fetchAllProducts())

    }, [])



    const navigateToNextPage=()=>{
        if(currentPage!=totalPages){
            setCurrentPage(currentPage+1)
        }
    }
    
    const navigateToPrevioustPage=()=>{
        if(currentPage!=1){
            setCurrentPage(currentPage-1)
        }
    }
    return (
        <>
            <Header insideHome={true} />
            <div className='w-[90%] mt-[150px] mx-auto px-3'>
                {
                    loading ?
                        <div style={{ height: "60vh" }} className='flex justify-center items-center font-bold'>
                            <img width={'90px'} height={'90px'} className='me-4' src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" alt="" /> Loading...</div>
                        :
                        <> 
                         <div className="grid grid-cols-4 gap-6">
                            {
                                allProducts.length > 0 ?
                                visibleProductCards?.map(product => (
                                        <div key={product?.id} className="rounded border p-2 shadow">
                                            <img style={{ width: "100%", height: "300px" }} src={product.image} alt="" />
                                            <div className="text-center">
                                                <h3 className="text-xl font-bold">{product.name}</h3>
                                                <Link className='bg-blue-500 text-white p-1 inline-block rounded' to={`/${product?.id}/view`}>View more</Link>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div className="font-bold text-center mt-5 mb-5 text-red-400">product not found</div>
                            }
                        </div>
                        
                        <div className="flex justify-center items-center mt-5 mb-5">
                            <span onClick={navigateToPrevioustPage} style={{cursor:'pointer'}}><i className='fa-solid fa-backward me-5'></i>

                            </span>
                            <span className='font-bold'> {currentPage} of {totalPages} </span>
                            <span onClick={navigateToNextPage} style={{cursor:'pointer'}}><i className='fa-solid fa-forward me-5'></i>

                            </span>
                        </div></>
                      
                }
            </div>
        </>
    )
}

export default Home