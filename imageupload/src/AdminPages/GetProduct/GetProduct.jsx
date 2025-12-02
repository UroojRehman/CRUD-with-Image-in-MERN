import axios from 'axios'
import React, { useState } from 'react'

const GetProduct = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

   const getProduct = async()=>{
    try {
        const res = await axios.get('http://localhost:3000/project/getproducts');
        setProducts(res.data.data)
        setLoading(false)
        console.log(res.data.data)
    } catch (error) {
        setLoading(false)
        console.log(error)
    }
   }

   useEffect(()=>{
    getProduct()
   }, [])
  return (
    <div>
      <h1>All Products</h1>
      {loading? ():()}
    </div>
  )
}

export default GetProduct
