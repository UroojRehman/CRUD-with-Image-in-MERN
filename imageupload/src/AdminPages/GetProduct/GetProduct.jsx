import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

const GetProduct = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

   const getProduct = async()=>{
    try {
        const res = await axios.get('http://localhost:3000/api/getproducts');
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
      <h1 className='text-center'>All Products</h1>
      {loading? (<h2 className='text-center'>Loading....</h2>):(
        <table className='table table-bordered'>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Image</th>
              <th>Actions</th>
            </tr>
            <tbody>
              {products.map((p)=>(
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.imageUrl? (
                    <img src={p.imageUrl} alt="" width={100} height={100}/>
                  ):("Image Not Found")}</td>
                  <td>
                    <button className='btn btn-warning'>Edit</button>
                    <button className='btn btn-danger'>Delete</button>
                  </td>
                </tr>
))}
            </tbody>
        </table>
      )}
      <Link className="btn btn-primary" to="/add-product">Add New Product</Link>
    </div>
  )
}

export default GetProduct
