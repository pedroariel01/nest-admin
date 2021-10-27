import { Controller ,Get,Post,Body,UseGuards} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('permissions')
@UseGuards(AuthGuard)
export class PermissionController {

    constructor(private permService:PermissionService){

    }

    @Get()
    async all() {
        return this.permService.all();
        
    }

    @Post()
    async create(@Body('name') name:string){
        return this.permService.create({name});

    }
}
