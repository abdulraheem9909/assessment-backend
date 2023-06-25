import { Category } from '@prisma/client';

export interface AllCategory {
  data: Category[];
  totalCount: number;
}
