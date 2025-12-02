import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');
   const [image, setImage] = useState(null);

   const handleSubmit = async(e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);
    try {
      const res = await axios.post('http://localhost:3000/api/products', formData,{
        headers:{
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
   }


  return (
    <>
      <div className='container'>
        <div className="row">
          <h1 className='text-center'>Add New Product</h1>
          <div className="col-6 offset-3">
            <form >
              <div className="form-group">
                <label htmlFor="" >ProductName</label>
              <input className='form-control' type="text" onChange={(e)=>setName(e.target.value)}/>
              </div>
              <label htmlFor="">ProductPrice</label>
              <input className='form-control' type="text" onChange={(e)=>setPrice(e.target.value)} />
              <label htmlFor="">ProductImage</label>
              <input className='form-control' type="file" accept='image/' onChange={(e)=>setImage(e.target.files[0])}/>
              <input className='btn btn-success' type="submit" value="Add Product" onClick={handleSubmit}/>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
