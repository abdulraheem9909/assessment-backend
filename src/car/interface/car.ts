import { Car } from '@prisma/client';

export interface AllCar {
  data: Car[];
  totalCount: number;
}
