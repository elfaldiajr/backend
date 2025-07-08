import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User &  { _id: Types.ObjectId }>,
    ) {}



    async createUser(username: string, password: string): Promise<{ id: string; username: string; password: string; isLoggedIn: boolean }> {
        const createdUser = new this.userModel({
            username,
            password,
            isLoggedIn: false,
        });
        const savedUser = await createdUser.save();
        return {
            id: savedUser._id?.toString() ?? "",  
            username: savedUser.username,
            password: savedUser.password,
            isLoggedIn: savedUser.isLoggedIn,
        };
    }

    async logout(): Promise<{ exito: boolean }> {
        return { exito: true };
    }

    async login(username: string, password: string): Promise<{ exito: boolean }> {
        try{
            if (!username || !password) {
                throw new BadRequestException({ error: "Faltan datos" });
            }
            const user = await this.userModel.findOneAndUpdate(
                { username, password },
                { isLoggedIn: true },
                { new: true }
            );

            if (user) {
                return { exito: true };
            }
            throw new UnauthorizedException({ error: "Credenciales incorrectas" });
        }catch(error){
            if (
                error instanceof BadRequestException ||
                error instanceof UnauthorizedException
            ) {
                throw error;
            }
            throw new InternalServerErrorException({ error: "Error" });
        }
    }
}