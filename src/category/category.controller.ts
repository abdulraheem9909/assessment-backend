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
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AllCategory } from './interface/category';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('category')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAllCategory(
    @Query('page') page = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<AllCategory> {
    return this.categoryService.getAllCategory(+page, +pageSize);
  }
  @Get('all')
  async getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body() body: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(body);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, body);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.deleteCategory(id);
  }
}
