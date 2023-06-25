import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Car } from '.prisma/client';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from '@nestjs/passport';
import { AllCar } from './interface/car';

@Controller('cars')
//AUTHGURAD TO PROTECT ROUTES
@UseGuards(AuthGuard('jwt'))
export class CarController {
  constructor(private readonly carService: CarService) {}

  //TO GET ALL DATA OF CARS
  @Get()
  async getAllCars(
    @Query('page') page = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<AllCar> {
    return this.carService.getAllCars(+page, +pageSize);
  }

  //TO GET TOTAL COUNT OF CARS
  @Get('count')
  async getAllCarsCount(): Promise<number> {
    return this.carService.getAllCarsCount();
  }

  @Get(':id')
  async getCarById(@Param('id') id: string): Promise<Car> {
    return this.carService.getCarById(id);
  }

  //TO CREATE CAR
  @Post()
  async createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.createCar(createCarDto);
  }

  //TO UPDATE CAR
  @Patch(':id')
  async updateCar(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return this.carService.updateCar(id, updateCarDto);
  }

  //TO DELETE CAR
  @Delete(':id')
  async deleteCar(@Param('id') id: string): Promise<Car> {
    return this.carService.deleteCar(id);
  }
}
