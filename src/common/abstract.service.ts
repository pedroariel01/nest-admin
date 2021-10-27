import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from './paginated-result.interface';

@Injectable()
export abstract class AbstractService {

    protected constructor(protected readonly repository:Repository<any>){

    }

    async all(relations=[]) : Promise<any[]>{
        return  this.repository.find({relations});
    }

    async paginate(page:number =1,relations=[]): Promise<PaginatedResult>{
        const take = 5;
        const[data,count] = await this.repository.findAndCount({take,
                                        skip:(page -1)*take,
                                        relations});

        return {
            meta:{count,
                page,
                lastPage:Math.ceil(count/take)
            },
            data:data
        }
    }


    async create(data) : Promise<any>{
        return this.repository.save(data);
    }

    async findOne(condition,relations=[]) : Promise<any>{
        return this.repository.findOne(condition,{relations});
    }

    async update(id:number,data): Promise<any>{
        return this.repository.update(id,data);
    }

    async delete(id:number) : Promise<any>{
        return this.repository.delete(id);
    }
}
