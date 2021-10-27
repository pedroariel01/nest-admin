import { Injectable } from '@nestjs/common';
import { Permission } from './permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class PermissionService extends AbstractService{
    constructor(@InjectRepository(Permission) private readonly permRepository : Repository<Permission>){
        super(permRepository)

    }

    
}
