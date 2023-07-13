import { Prisma } from '@prisma/client';

export class UpdatePostDto implements Omit<Prisma.PostUpdateInput, ''> {}
