import { Prisma } from '@prisma/client';

export class WherePostDto implements Omit<Prisma.PostWhereInput, ''> {}
