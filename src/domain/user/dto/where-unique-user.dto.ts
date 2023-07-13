import { Prisma } from '@prisma/client';

export class WhereUniqueUserDto implements Omit<Prisma.UserWhereUniqueInput, ''> {}
