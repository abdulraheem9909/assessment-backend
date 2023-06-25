import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AllCategory } from './interface/category';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CarService } from 'src/car/car.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly carService: CarService,
  ) {}
  async getAllCategory(page: number, pageSize: number): Promise<AllCategory> {
    const skip = page * pageSize;

    const [data, totalCount] = await Promise.all([
      this.prisma.category.findMany({
        skip,
        take: pageSize,
      }),
      this.prisma.category.count(),
    ]);

    return { totalCount, data };
  }
  async getAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async getCategoryById(id: string): Promise<Category> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const existingUser = await this.findByName(createCategoryDto?.name);
    if (existingUser) {
      throw new ConflictException('Name already exists');
    }
    return this.prisma.category.create({ data: createCategoryDto });
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Category Not Found');
    }
    const existingUser = await this.findByName(updateCategoryDto?.name);
    if (existingUser) {
      throw new ConflictException('Name already exists');
    }
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async deleteCategory(id: string): Promise<Category> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('Category Not Found');
    }
    const isUsed = await this.carService.findByCategory(user?.name);
    if (isUsed) {
      throw new ConflictException('Category is in use');
    }
    return this.prisma.category.delete({ where: { id } });
  }
  async findById(id: string): Promise<Category> {
    return await this.prisma.category.findUnique({ where: { id } });
  }
  async findByName(name: string): Promise<Category> {
    return await this.prisma.category.findUnique({ where: { name } });
  }
}
