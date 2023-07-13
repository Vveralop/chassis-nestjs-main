import { Prisma } from '@prisma/client';

export class OrderByPostDto implements Omit<Prisma.PostOrderByWithRelationInput, ''> {}
