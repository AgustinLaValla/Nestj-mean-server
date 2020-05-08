import { Injectable, NotFoundException, HttpException, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/user/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPaylaod } from './interfaces/jwt-payload';
import { OAuth2Client } from 'google-auth-library';
import { config } from 'dotenv';

config();



@Injectable()
export class LoginService {

    private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    constructor(@InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService) { }

    async signIn(authCredentials: AuthCredentialsDto): Promise<{ user: User, token: string } | { error: any }> {
        try {
            const { email, password } = authCredentials;

            const user = await this.userModel.findOne({ email });
            if (!user) throw new NotFoundException(`User Not Found`);

            const isValid = await compare(password, user.password);
            if (!isValid) throw new UnprocessableEntityException('Email or password is wrong');

            user.password = null;


            const { username, img, role, google } = user;
            const payload: JwtPaylaod = { username, email, img, role, google };

            const token = await this.jwtService.sign(payload);

            return { user, token };
        } catch (error) {
            return error;
        };
    };


    async signInWhitGoogle(token: string) {
        try {
            const googleUser = await this.verify(token);
            const user = await this.userModel.findOne({ email: googleUser.email });
            if (user) {
                if (!user.google) {
                    throw new BadRequestException(`You Sould login by email and password`);
                } else {

                    const { username, img, role, google, email } = user;
                    const payload: JwtPaylaod = { username, email, img, role, google };

                    const token = await this.jwtService.sign(payload);
                    return { user, id: user._id, token };
                };
            } else {
                const { username, email, img, google } = googleUser;
                const newUser = await this.userModel.create({ username, email, img, google, password: ':)' });
                await newUser.save();
                const token = this.jwtService.sign({ newUser });
                return { user: newUser, id: newUser._id, token };
            }
        } catch (error) {
            console.log(error);
            return error;
        };
    };

    async verify(token: string) {
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const paylaod = ticket.getPayload();
        return {
            username: paylaod.name,
            email: paylaod.email,
            img: paylaod.picture,
            google: true
        };
    };

}
