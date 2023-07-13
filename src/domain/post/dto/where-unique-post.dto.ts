import { Prisma } from '@prisma/client';

export class WhereUniquePostDto implements Omit<Prisma.PostWhereUniqueInput, ''> {}
