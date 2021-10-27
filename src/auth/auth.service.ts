import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {

    constructor(private jwtService : JwtService){

    }

    async userID(request:Request): Promise<number>{
        const cookies = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookies);
        return data['id'];

    }
}
