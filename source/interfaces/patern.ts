import { Document } from 'mongoose';

export interface IPatern extends Document {
    input: number;
    result: object | null;
    message: string | null;
}
