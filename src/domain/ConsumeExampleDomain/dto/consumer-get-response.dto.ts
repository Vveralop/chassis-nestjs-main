import { ApiProperty } from '@nestjs/swagger';
import { ConsumerGetResponseChildDto } from './consumer-get-response-child.dto';
export class ConsumerGetResponseDto {
    @ApiProperty({default:0})
    propParent:number;
    
    child:ConsumerGetResponseChildDto
}