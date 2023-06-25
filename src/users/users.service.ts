import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailerService,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: userDto });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
  async sendEmail(data): Promise<any> {
    try {
      await this.mailService.sendMail({
        to: `${data.email}`,
        from: 'abdulraheem9909@gmail.com',
        subject: 'Assessment Signup Email | AbdulRaheem',
        template: 'welcomeMail',
        context: {
          data: { ...data },
        },
      });
    } catch (error) {
      const user = await this.findByEmail(data?.email);
      if (user) {
        await this.deleteUser(user.id);
        console.log('User creation rolled back.');
      }
      console.log('Error sending email:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
