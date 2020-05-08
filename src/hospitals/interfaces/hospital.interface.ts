import { Document } from "mongoose";

export interface Hospital extends Document {
    name: string;
    img?: string;
    user?: string;
    createdAt?:Date;
    UpdatedAt?:Date;
};