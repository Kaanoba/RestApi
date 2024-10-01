import mongoose from 'mongoose';
import * as process from "node:process";

const connectDB = async () => {

    try {

        const connect = await mongoose.connect(process.env.MONGO_URI as string);
        if (connect) {
            return console.log('Connected to database');
        }

    } catch (e) {
        console.error(e);
    }

}

export default connectDB;