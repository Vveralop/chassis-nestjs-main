import { Prisma } from '@prisma/client';

export class OrderByUserDto implements Omit<Prisma.UserWhereInput, ''> {}
