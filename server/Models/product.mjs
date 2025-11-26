import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {type: String, required:true}, // String is shorthand for {type: String}
  price: {type: Number, required:true}, 
  imageUrl: {type: String}, 
  
});
export default mongoose.model("Products", productSchema);