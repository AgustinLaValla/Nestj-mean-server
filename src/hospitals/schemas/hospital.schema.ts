import { Schema } from 'mongoose';

export const HospitalSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    img: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});