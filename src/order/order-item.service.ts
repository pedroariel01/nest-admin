import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { OrderItem } from './models/order-item.entity';

@Injectable()
export class OrderItemService extends AbstractService{
    
    constructor(@InjectRepository(OrderItem) private readonly orderitemRepository : Repository<OrderItem>)
    {
        super(orderitemRepository);
    }
}
