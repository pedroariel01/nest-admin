import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Put, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { AuthGuard } from 'src/auth/auth.guard';
import { HasPermission } from 'src/permission/has-permission.decorator';
import { OrderCreateDTO } from './models/order-create.dto';
import { OrderItem } from './models/order-item.entity';
import { Order } from './models/order.entity';
import { OrderItemCreateDTO } from './order-item-create.dto';
import { OrderItemService } from './order-item.service';
import { OrderService } from './order.service';

@Controller()
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
    constructor(private orderService:OrderService,
        private orderitemService:OrderItemService){

    }

    @Get('orders')
    @HasPermission('orders')
    async all(@Query('page')page:number=1){
        return this.orderService.paginate(page,['order_items'])
        // return this.orderService.all(['order_items'])

    }

    @Get('orders/:id')
    @HasPermission('orders')
    async get(@Param('id') id:number):Promise<Order>{
        return this.orderService.findOne({id},['order_items'])
        // return this.orderService.all(['order_items'])

    }

    @Post('orders')
    @HasPermission('orders')
    async create(@Body() body: OrderCreateDTO): Promise<Order>{
        const {order_items, ...data} = body;

        return await this.orderService.create({
            ...data,
            order_items:order_items.map(id=>({id}))
        })
    }

    @Put('orders/:id')
    @HasPermission('orders')
    async update(@Param('id') id:number,
                @Body('order_items') ids:number[]){
        
        const order = await this.orderService.findOne({id});

        return this.orderService.create({
            ...order,
            order_items:ids.map(id=>({id}))
        })
        
    }

    @Post('order_items')
    @HasPermission('orders')
    async create_order_items(@Body() body:OrderItemCreateDTO):Promise<OrderItem>{

        const {order_id,...data } = body;

        return this.orderitemService.create({
            ...data,
            order:{id:order_id}
        });

    }

    @Post('export')
    @HasPermission('orders')
    async export(@Res() response : Response){

        const jsonParser = new Parser({
            fields:['ID','Name','Email','Product Title','Price','Quantity']
        });

        const orders = await this.orderService.all(['order_items']);
        
        const json = []

        orders.forEach( (order:Order) => {
            json.push({
                ID:order.id,
                Name : order.name,
                Email : order.email,
                'Product Title' : '',
                Price : '',
                Quantity:''
            })

            order.order_items.forEach((order_item:OrderItem)=>{
                json.push({
                    ID:'',
                    Name : '',
                    Email : '',
                    'Product Title' : order_item.product_title,
                    Price : order_item.price,
                    Quantity:order_item.quantity
                })
            })
        })

        const csv = jsonParser.parse(json)

        response.header('Content-Type','text/csv')
        response.attachment('orders.csv')
        return response.send(csv)

    }


    @Get('chart')
    @HasPermission('orders')
    async chart(){
        return this.orderService.chart();
    }

}
