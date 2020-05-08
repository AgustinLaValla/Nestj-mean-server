/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Post, Body, UsePipes, ValidationPipe, Res, Get, Req, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class LoginController {
    constructor(private loginService: LoginService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async signIn(@Body() authCredentials: AuthCredentialsDto, @Res() res: Response): Promise<Response> {
        try {
            const data = await this.loginService.signIn(authCredentials);
            return res.json({ ok: true, ...data })
        } catch (error) {
            return {...error}
        }
    }

    @Post('google')
    async signInWhitGoogleAccount(@Body('token') token: string) {
        return this.loginService.signInWhitGoogle(token);
    };
}
