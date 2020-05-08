import { UserRole } from "src/user/interfaces/user.role";

export interface JwtPaylaod {

    username:string 
    email:string;
    role:UserRole;
    img:string;
    google:boolean;
};