import mongoose, { Schema } from 'mongoose';
import { IPatern } from '../interfaces/patern';

const PaternSchema: Schema = new Schema({
    input: {
        type: String,
        required: true
    },
    result: Object || null,
    message: {
        type: String || null
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const Patern = mongoose.model<IPatern>('patern', PaternSchema);

// user1992
// user-1992
