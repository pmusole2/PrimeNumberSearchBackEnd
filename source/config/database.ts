import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//@ts-ignore
const db =
    'mongodb://user1992:user-1992@zazuchallenge-shard-00-00.ohwxk.mongodb.net:27017,zazuchallenge-shard-00-01.ohwxk.mongodb.net:27017,zazuchallenge-shard-00-02.ohwxk.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-49mt5f-shard-0&authSource=admin&retryWrites=true&w=majority'; //: string = process.env.MONGOURI;

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
        // process.exit(1);
    }
};

export const close = () => {
    return mongoose.disconnect();
};
