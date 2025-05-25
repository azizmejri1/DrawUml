import { Body, Controller, Get, Post, Res, UseGuards,Request } from '@nestjs/common';
import { LoginDto } from './LoginDto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './AuthGuard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService :AuthService ){}

    @Post("login")
    async login(@Body() loginDto : LoginDto,@Res() res:Response){
        const userAuth = await this.authService.login(loginDto);
        res.cookie('jwt', userAuth.access_token, {
            httpOnly: true,  // Prevents client-side JavaScript access
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'strict', // Prevents CSRF attacks
            maxAge: 72 * 60 * 60 * 1000, // 1 day expiration
        });
        res.send({id:userAuth.id,name:userAuth.name});
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    logout(@Res() res: Response) {
        res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });

    res.status(200).send({ message: 'Logged out and cookie cleared' });
   }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
