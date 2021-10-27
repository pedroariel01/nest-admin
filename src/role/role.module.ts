import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { CommonModule } from 'src/common/common.module';


@Module({
  imports:[
    TypeOrmModule.forFeature([Role]),
    CommonModule
    
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports:[RoleService]
})
export class RoleModule {}
