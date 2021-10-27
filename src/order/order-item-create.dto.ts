import { IsEmail, IsNotEmpty } from 'class-validator';

export class OrderItemCreateDTO{

    @IsNotEmpty()
    product_title:string;

    @IsNotEmpty()
    price:number;
    
    @IsNotEmpty()
    quantity:string;

    @IsNotEmpty()
    order_id:number;

}