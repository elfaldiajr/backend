import { All, Body, Controller, Get, MethodNotAllowedException, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller({})
export class UserController {

    constructor(private userService: UserService) {}

    @Post('login')  
    login(@Body() body: { username: string, password: string }) {
        return this.userService.login(body.username, body.password);    
    }

    @Get('logout')
    logout() {
        return this.userService.logout();    
    }

    @Post('createUser')
    createUser(@Body() body: { username: string, password: string }) {
        return this.userService.createUser(body.username, body.password);   
    }

    @All('login')
    handleOtherMethods() {
        throw new MethodNotAllowedException({ error: 'Verbo incorrecto' });
    }

    @All('logout')
    handleOtherMethodsLogout() {
        throw new MethodNotAllowedException({ error: 'Verbo incorrecto' });
    }

}