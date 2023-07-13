import { Prisma } from '@prisma/client';

export class WhereUserDto implements Omit<Prisma.UserWhereInput, ''> {}
