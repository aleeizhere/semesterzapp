import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://aleeizhere:codingiswhereimelt7@cluster0.holudwm.mongodb.net/semesterz?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
