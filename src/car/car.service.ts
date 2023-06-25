// src/car/car.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '.prisma/client';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AllCar } from './interface/car';

@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCars(page: number, pageSize: number): Promise<AllCar> {
    const skip = page * pageSize;

    const [data, totalCount] = await Promise.all([
      this.prisma.car.findMany({
        skip,
        take: pageSize,
      }),
      this.prisma.car.count(),
    ]);

    return { totalCount, data };
  }
  async getAllCarsCount(): Promise<number> {
    return await this.prisma.car.count();
  }

  async getCarById(id: string): Promise<Car> {
    return this.prisma.car.findUnique({ where: { id } });
  }

  async createCar(createCarDto: CreateCarDto): Promise<Car> {
    return this.prisma.car.create({ data: createCarDto });
  }

  async updateCar(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Car Not Found');
    }
    return this.prisma.car.update({
      where: { id },
      data: updateCarDto,
    });
  }

  async deleteCar(id: string): Promise<Car> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Car Not Found');
    }
    return this.prisma.car.delete({ where: { id } });
  }
  async findById(id: string): Promise<Car> {
    return await this.prisma.car.findUnique({ where: { id } });
  }
  async findByCategory(cat: string): Promise<Car> {
    return await this.prisma.car.findFirst({ where: { category: cat } });
  }
}
