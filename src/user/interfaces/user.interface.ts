import { Document } from "mongoose";
import { UserRole } from "./user.role";

export interface User extends Document {
    username:string;
    email:string;
    password:string;
    img?:string;
    role:UserRole;
    google:boolean;
    createdAt?:string;
    updatedAt?:string;
};

