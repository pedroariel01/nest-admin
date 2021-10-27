import { IsNotEmpty } from "class-validator";

export class ProductCreateDTO{
    
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    image:string;

    @IsNotEmpty()
    price:number;

}