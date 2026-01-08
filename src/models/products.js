import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        brand: String,
        price: Number,
        stock: Number,

        image_url: String,
        is_active: Boolean
    }
)

export default mongoose.model("products", productSchema);