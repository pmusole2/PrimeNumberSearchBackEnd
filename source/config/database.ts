import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//@ts-ignore
const db: string = process.env.MONGOURI;

export const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
