import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: any): Promise<any> {
    return this.prisma.user.create({ data: userDto });
  }

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // async findById(id: number): Promise<any> {
  //   return this.prisma.user.findUnique({ where: { id } });
  // }
}
