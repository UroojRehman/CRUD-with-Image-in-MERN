import express from 'express'
import {main} from '../Connection/connection.mjs';
import { createProduct } from '../Controller/ProductController.mjs';
import upload from '../utils/upload.mjs';


const router = express.Router();

router.post('/products', upload.single("imageUrl"), createProduct);

export default router;