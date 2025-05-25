import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './UserDto';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){}

    @Post("signUp")
    createUser(@Body() userDto : UserDto){
        return this.userService.createUser(userDto);
    }

    @Get("profile/:id")
    getUserById(@Param('id') id : number){
        return this.userService.getUserById(id);
    }
}
