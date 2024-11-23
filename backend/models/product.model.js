import mongoose from "mongoose";

// Model for Product migration 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
 }, {
    timestamps: true // createdAt, updatedAt
});

// create product using the productSchema as a parameter
const Product = mongoose.model('Product', productSchema);

export default Product;