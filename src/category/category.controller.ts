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
//AUTHGURAD TO PROTECT ROUTES
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  //TO GET ALL DATA OF CATEGORIES WITH PAGINATION
  @Get()
  async getAllCategory(
    @Query('page') page = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<AllCategory> {
    return this.categoryService.getAllCategory(+page, +pageSize);
  }

  //TO GET ALL DATA OF CATEGORIES WITHOUT PAGINATION
  @Get('all')
  async getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  //TOGET DATA OF CATEGORY ON SPECIFIC API
  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  //TO CREATE CATEGORY
  @Post()
  async createCategory(@Body() body: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(body);
  }

  //TO UPDATE CATEGORY
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, body);
  }
  //TO DELETE CATEGORY
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.deleteCategory(id);
  }
}
