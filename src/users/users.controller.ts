import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: CreateUserDto): Promise<User> {
    const { email, name } = signUpDto;
    const user = await this.authService.signUp(email, name);
    return user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.authService.validateUser(email, password);
    const res = await this.authService.login(user);
    return { access_token: res.access_token, data: res.data };
  }
}
