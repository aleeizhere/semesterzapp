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
      'mongolink here',
    ),
  ],
})
export class AppModule {}
