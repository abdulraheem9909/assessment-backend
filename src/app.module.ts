import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { emailConfig } from './emailConfig';
import { CarModule } from './car/car.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    MailerModule.forRoot(emailConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CarModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
