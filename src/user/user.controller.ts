import { Controller, Post, Body, UsePipes, ValidationPipe, Put, Param, Res, HttpStatus, Delete, Get, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { GetUsersDto } from './dto/get-users.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get()
    async getUsers(
        @Query(ValidationPipe) getUsersDto: GetUsersDto,
        @Res() res: Response): Promise<Response> {
        const users = await this.userService.getUsers(getUsersDto);
        return res.json({ok:true, ...users});
    };

    @Post()
    @UsePipes(ValidationPipe)
    async signUp(
        @Body() createUserDto: CreateUserDto,
        @Res() res: Response) {
        const user = await this.userService.createUser(createUserDto);
        return res.status(HttpStatus.CREATED).json({ ok: true, message: 'User succesfully created', user });
    };

    @Put('/:id')
    async updateUser(
        @Param('id') id: string,
        @Body(ValidationPipe) updateUserDto: UpdateUserDto,
        @Res() res: Response): Promise<Response> {
        const user = await this.userService.updateUser(id, updateUserDto);
        return res.status(HttpStatus.OK).json({ ok: true, message: 'User succesfully updated', user });
    };


    @Delete('/:id')
    async deleteUser(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        const user = await this.userService.deleteUser(id);
        return res.json({ ok: true, message: 'User succesfully delete', user });
    };

};
