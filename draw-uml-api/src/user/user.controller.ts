import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './UserDto';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){}

    @Post("signUp")
    createUser(@Body() userDto : UserDto){
        return this.userService.createUser(userDto);
    }
}
