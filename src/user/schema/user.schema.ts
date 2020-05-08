import { Schema } from 'mongoose';
import { UserRole } from '../interfaces/user.role';

const rolesValidos = {
    values: [UserRole.ADMIN_ROLE , UserRole.USER_ROLE],
    message: '{VALUE} no es un rol válido'
};

export const UserSchema = new Schema({
    username: { type:String, required:[true, 'Username is required'], unique:true },
    email: { type:String, required:[true, 'Email is required'], unique:true },
    password: { type:String, required:[true, 'Password is required'] },
    img: { type:String, required:false },
    role: { type:String, required:true, default: UserRole.USER_ROLE, enum: rolesValidos },
    google: { type:Boolean,  default: false }
}, { timestamps:true });

