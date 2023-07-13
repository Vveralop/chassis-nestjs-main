import { Prisma } from '@prisma/client';

export class UpdateUserDto implements Omit<Prisma.UserUpdateInput, ''> {}
