import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPaylaod } from "./interfaces/jwt-payload";
import { UserService } from "src/user/user.service";
import { UnauthorizedException, Injectable } from "@nestjs/common";
import { SEED } from "src/config/seed.config";

@Injectable()
export class JwtStrategy extends  PassportStrategy(Strategy) { 
    constructor(private userService:UserService) { 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// Set how it will be retrieve the JWT from the request
            secretOrKey: SEED, // The secret that passport is gonna use to verify the signature of the token extracted
        })
    };

    async validate(payload:JwtPaylaod) { //Validate and injeect user retrieved in the request object (req.user)
        const { email } = payload;

        const user = await this.userService.getUserByEmail(email);
        if(!user) throw new UnauthorizedException();

        return user;
    };

}