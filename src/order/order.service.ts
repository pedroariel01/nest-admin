import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginated-result.interface';
import { Repository } from 'typeorm';
import { Order } from './models/order.entity';

@Injectable()
export class OrderService extends AbstractService{
    constructor(@InjectRepository(Order) private readonly orderRepository : Repository<Order>){
        super(orderRepository)
    }

    async paginate(page:number =1,relations=[]): Promise<PaginatedResult>{
        
        const {data,meta} = await super.paginate(page,relations);
        
        
        return {
            meta,
            data:data.map((order:Order)=>({
                id:order.id,
                name:order.name,
                email:order.email,
                created_at:order.create_at,
                total:order.total,
                order_items:order.order_items
            }))
        }
    }

    async chart(){
        return this.orderRepository.query(`
        SELECT dat, sum(su) as ss from(
            SELECT  DATE_FORMAT(create_at,'%Y-%m-%d') as dat , sum(oi.price * oi.quantity ) as su
            FROM  orders o JOIN order_items oi ON oi.order_id = o.id 
            GROUP BY create_at ) a 
            GROUP BY dat;
        `);
    }
}
