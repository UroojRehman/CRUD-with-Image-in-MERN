import {fileURLToPath} from 'url';
import path from 'path';
import fs from 'fs/promises';
import product from '../Models/product.mjs';
const __dirname = path.dirname(fileURLToPath(import.meta.url)); 

//helper to build public image url

const getImageUrl = (req, filename) =>{
    return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
}

//Create Product
export const createProduct = async (req, res) =>{
    try {

        const {name, price} = req.body;
        if(!name || !price){
            if(req.file){
                await fs.unlink(path.join(__dirname, '../uploads/', req.file.filename));
            }
            return res.status(400).json({meassage: "Name and Price are required"});

        }
        const imageUrl = req.file ? getImageUrl(req, req.file.filename) : null;
        const product = await product.create({
            name,
            price,
            imageUrl
        });

        res.status(201).json({success:true, data: product});
        
    } catch (error) {
        if(req.file){
            await fs.unlink(path.join(__dirname,'../uploads/', req.file.filename));
            res.status(500).json({success: false, message: error.message});
        }
    }
}

//Get All Products

export const getAllProducts = async (req, res) =>{
    try {
       const products = await product.find();
        res.status(200).json({success:true, data: products});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

//Get Single Product
export const getProductById = async (req, res) =>{
    try {
        const p = await product.findById(req.params.id)
        if(!p){
             res.status(404).json({success:false, message: "Product not found"});
        }else{
            res.status(200).json({success:true, data: p});
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

//Update Product
export const updateProduct = async (req, res) =>{
    try {
        const {name, price} = req.body;
        const p = await product.findById(req.params.id);
        if(!p){
            if(req.file){
                await fs.unlink(path.join(__dirname, '../uploads/', req.file.filename));
                res.status(404).json({success:false, message: "Product not found"})
            }
        }

        // Delete old image if new image is uploaded
        if(req.file){
            if(p.imageUrl){
                const oldImageFilename = p.imageUrl.split('/').pop();
                if(oldImageFilename){
                    await fs.unlink(path.join(__dirname, '../uploads/', oldImageFilename)).catch(()=>{})
     
                }

            }
            p.imageUrl = getImageUrl(req, req.file.filename);
        }
        if(name) p.name = name;
        if(price) p.price = price;
    } catch (error) {
        if(req.file){
            await fs.unlink(path.join(__dirname, '../uploads/', req.file.filename));
            res.status(500).json({success: false, message: error.message});
        }
    }
};

//Delete Product
export const deleteProduct = async(req, res)=>{
    try {
        const p = await product.findByIdAndDelete(req.params.id);
        if(!p){
            return res.status(404).json({success:false, message: "Product not found"});
        }
        if(p.imageUrl){
            const filename = p.imageUrl.split('/').pop();
            if(filename){
                await fs.unlink(path.join(__dirname,'../uploads/', filename)).catch(()=>{})
            }
        }
        res.status(200).json({success:true, message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({success:false, messsage: error.message});
    }
}