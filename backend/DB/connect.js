import mongoose from "mongoose";


const connectDB=(url)=>{
//     mongoose.set('strictQuery', true);
// mongoose.connect(process.env.MONGO_URL)
     mongoose.connect(url);
}

export default connectDB