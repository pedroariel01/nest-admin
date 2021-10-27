import { SetMetadata } from "@nestjs/common";


export const HasPermission = (acces:string) => SetMetadata('access',acces);