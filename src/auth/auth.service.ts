import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { generateRandomPassword } from 'src/helper';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new ForbiddenException('Invalid credentials');
  }
  async signUp(email: string, name: string): Promise<any> {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const passwordGenerated = generateRandomPassword(10);
    const hashedPassword = await bcrypt.hash(passwordGenerated, 10);
    const user = await this.userService.create({
      email,
      password: hashedPassword,
      name,
    });
    await this.userService.sendEmail({
      email,
      password: passwordGenerated,
      name,
    });
    const { password, ...result } = user;
    return result;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      data: user,
    };
  }
}
