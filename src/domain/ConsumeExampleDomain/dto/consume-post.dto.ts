import { PartialType, ApiProperty } from '@nestjs/swagger';
import { ConsumeGetDto } from './consume-get.dto';

export class ConsumePostDto{
    @ApiProperty({default:'example'})
    postExample:string
}
