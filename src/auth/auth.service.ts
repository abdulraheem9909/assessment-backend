import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    throw new UnauthorizedException();
  }
  async signUp(email: string, name: string): Promise<any> {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
      
    }
    const password = generateRandomPassword(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({email, hashedPassword});
    const { password: _, ...result } = user;
    return result;
  }


  async login(user: any): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
