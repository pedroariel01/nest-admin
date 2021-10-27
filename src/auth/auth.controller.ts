import { BadRequestException, Body, Controller, NotFoundException, Post,Get ,Req, Res, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response , Request} from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(private userService: UserService,
        private jwtService : JwtService,
        private authService: AuthService){

    }

    @Post('register')
    async register(@Body() body : RegisterDTO){

        if(body.password !==body.password_confirm){
            throw new BadRequestException('Password do not match')
        }
        const hashed = await bcrypt.hash(body.password,12);
        return this.userService.create(
            {
                first_name:body.first_name,
                last_name:body.last_name,
                email:body.email,
                password:hashed,
                role:{id:4}
            }
        );

    }

    @Post('login')
    async login(
        @Body('email') email:string,
        @Body('password') password:string,
        @Res({passthrough:true})response : Response
        )
    {
        const user = await this.userService.findOne({email})
        if(!user){
            throw new NotFoundException('User Not Found');
        }
        if(!await bcrypt.compare(password,user.password))
        {
            throw new BadRequestException('Invalid Credentials')
        }

        const token = await this.jwtService.signAsync({id:user.id})

        response.cookie('jwt',token,{httpOnly:true})

        return user;

    }


    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request:Request){
        const id = await this.authService.userID(request)

        return this.userService.findOne({id});
        

    }

    @UseGuards(AuthGuard)
    @Get('logout')
    async logout(@Res({passthrough:true}) response:Response){
        response.clearCookie('jwt')

        return {
            message:'Success'
        }
    }
}
