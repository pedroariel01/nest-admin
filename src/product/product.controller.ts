import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { HasPermission } from 'src/permission/has-permission.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { ProductCreateDTO } from './product-create.dto';
import { ProductUpdateDTO } from './product-update.dto';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
    constructor(private productService:ProductService){

    }

    @Get()
    @HasPermission('products')
    async all(@Query('page')page:number=1){
        return this.productService.paginate(page)
    }


    @Post()
    @HasPermission('products')
    async create(@Body()body:ProductCreateDTO){

        return this.productService.create(body);
    }

    @Get(':id')
    @HasPermission('products')
    async get(@Param('id')id:number){
        return this.productService.findOne({id});
    }
    

    @Get('filter/:title')
    @HasPermission('products')
    async filter(@Param('title')title:string){
        return this.productService.filterTitle(title);
    }


    @Put(':id')
    @HasPermission('products')
    async update(@Param('id') id:number,
                @Body() body:ProductUpdateDTO)
    {
        await this.productService.update(id,body)

        return await this.productService.findOne({id})
        
    }

    @Delete(':id')
    @HasPermission('products')
    async delete(@Param('id') id:number){
        return this.productService.delete(id);
    }


}
