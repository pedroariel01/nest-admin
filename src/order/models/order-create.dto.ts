import { IsEmail, IsNotEmpty } from 'class-validator';

export class OrderCreateDTO{

    @IsNotEmpty()
    first_name:string;

    @IsNotEmpty()
    last_name:string;
    
    @IsNotEmpty()
    @IsEmail()
    email:string;


    @IsNotEmpty()
    order_items:number[];

}