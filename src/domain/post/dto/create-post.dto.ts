import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from '@prisma/client';
import { } from 'class-validator';
import { IsString, IsBoolean, IsEmail } from "class-validator";

export class CreatePostDto implements Omit<Prisma.PostCreateInput, 'author' | 'published'> {
    @IsString()
    @ApiProperty({ default: 'Title' })
    title: string;
    @IsString()
    @ApiProperty({ default: 'Content' })
    content?: string;
    @IsBoolean()
    @IsEmail()
    @ApiProperty({ default: 'email@domain.com' })
    authorEmail: string;

}
