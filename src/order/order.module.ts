import { Module } from '@nestjs/common';
import { Order } from './models/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { OrderItem } from './models/order-item.entity';
import { OrderItemService } from './order-item.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order,OrderItem]),
    CommonModule,
    
  ],
  controllers: [OrderController],
  providers: [OrderService,OrderItemService]
})
export class OrderModule {}
