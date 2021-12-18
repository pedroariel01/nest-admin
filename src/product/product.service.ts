import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService extends AbstractService{

    constructor(@InjectRepository(Product) private readonly productRepository:Repository<Product>){
        super(productRepository)
    }

    async filterTitle(value:string) : Promise<any[]>{
        return this.repository.createQueryBuilder("prod").where("lower(prod.title) like :val",{val: `%${ value.toLowerCase() }%` }).getMany()
    }
}
