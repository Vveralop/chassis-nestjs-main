import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { IsString,IsEmail } from "class-validator";
//Example "OMIT" for DTOs
export class CreateUserDto implements Omit<User,'id'>  {
    @IsEmail()
    @ApiProperty({default:'email@email.com'})
    email: string;
 
    @IsString()
    @ApiProperty({default:'Some Name'})
    name: string;

}
