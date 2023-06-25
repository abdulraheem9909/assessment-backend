import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CarModule } from 'src/car/car.module';

@Module({
  imports: [PrismaModule, CarModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
