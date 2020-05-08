import { Document } from "mongoose";

export interface Doctor extends Document { 
    name:string;
    img:string;
    user?:string;
    hospital?:string;
    createdAt?: Date;
    UpdatedAt?:Date;
};