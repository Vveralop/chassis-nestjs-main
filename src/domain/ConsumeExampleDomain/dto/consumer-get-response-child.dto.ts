import { ApiProperty } from "@nestjs/swagger"

export class ConsumerGetResponseChildDto {
    @ApiProperty({default:100})
    prop1:number
    @ApiProperty({default:'any custom value'})
    prop2:string
}