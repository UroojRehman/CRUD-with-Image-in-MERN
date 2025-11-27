import express from 'express'
import {main} from '../Connection/connection.mjs';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../Controller/ProductController.mjs';
import upload from '../utils/upload.mjs';


const router = express.Router();

router.post('/products', upload.single("image"), createProduct);

router.get('/getproducts', getAllProducts);

router.get('/getproducts/:id', getProductById);

router.put('/updateproducts/:id', updateProduct);

router.delete('/deleteproducts/:id', deleteProduct)

export default router;