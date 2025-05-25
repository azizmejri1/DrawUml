import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './UserDto';
import { User } from './user.entity';
import { UpdateUserDto } from './UpdateUserDto';
import { Response } from 'express';

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

    @Delete(":id")
    async deleteUser(@Param('id', ParseIntPipe) id : number,@Res() res: Response){
        await this.userService.deleteUser(id,res);
    }

    @Put(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateData: UpdateUserDto,
    ): Promise<User> {
        return this.userService.updateUser(id, updateData);
    }

}
