import { Injectable, HttpException, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/createuser.dto';
import { genSalt, hash } from 'bcrypt';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async getUsers(getUsersDto: GetUsersDto): Promise<{ users: User[], counter: number }> {

        const skip = getUsersDto.skip || 0;
        const paginate = getUsersDto.paginate || 5;

        const users = await this.userModel.find({}, 'username email role img')
            .skip(skip)
            .limit(paginate)
            .exec();
            
        const counter = await this.userModel.estimatedDocumentCount();

        return { users, counter }
    };

    async getUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) throw new NotFoundException(`User Not Found`);
        return user;
    };

    async getUserByEmail(email:string) { 
        const user = await this.userModel.findOne({email});
        return user;
    };

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = await this.userModel.create({ ...createUserDto });
            const salt = await genSalt(10);
            user.password = await hash(user.password, salt);
            await user.save();
            user.password = null;
            console.log(user);
            return user;
        } catch (error) {
            if ((error.errors.username && error.errors.username.kind === 'unique') ||
                (error.errors.email && error.errors.email.kind === 'unique'))
                throw new HttpException(error.message, 400);
        };
    };


    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            await this.getUserById(id);
            const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
            user.password = null;
            return user;
        } catch (error) {
            console.log(error);
            if(error.code === 11000) throw new NotAcceptableException(`User already exists`);
        };
    };

    async deleteUser(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id);
    };

};
