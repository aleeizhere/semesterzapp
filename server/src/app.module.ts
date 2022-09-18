import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './posts/posts.module';
import { ProposalModule } from './proposals/proposal.module';
@Module({
  imports: [
    AuthModule,
    PostModule,
    ProposalModule,
    MongooseModule.forRoot(
      'mongodb+srv://aleeizhere:codingiswhereimelt7@cluster0.holudwm.mongodb.net/semesterz?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
