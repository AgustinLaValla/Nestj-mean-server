import { Schema } from 'mongoose';

export const DoctorSchema = new Schema({
    name: { type: String, required: [true, 'El name is requried'] },
    img: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: [true, 'Este campo es obligatorio'] }
});