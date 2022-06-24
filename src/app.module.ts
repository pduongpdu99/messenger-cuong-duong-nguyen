import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdapterModule } from './common/adapters/adapter.module';
import { AuthModule } from './routes/auth/auth.module';
import { FileUploadModule } from './routes/files/file.module';
import { ExportsModule } from './routes/exports/exports.module';
import { RecipientModule } from './routes/sendmail/recipient/recipient.module';
import { ConfigModule } from '@nestjs/config';
import { AppGateway } from './app.gateway';
import { GroupModule } from './routes/group/group.module';
import { MessageModule } from './routes/message/message.module';
import { UserModule } from './routes/user/user.module';
import { EmoijModule } from './routes/emoij/emoij.module';

@Module({
  imports: [
    // schemas
    AuthModule,
    UserModule,
    GroupModule,
    MessageModule,
    EmoijModule,

    // file module
    FileUploadModule,
    // ExportsModule,

    // send mailer
    RecipientModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // adapter module
    AdapterModule,

    // middle ware module
    // MiddlewareModule,
  ],
  controllers: [AppController],
  providers: [AppGateway, AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   // logger
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .forRoutes(
  //       { path: 'user', method: RequestMethod.GET }
  //     )
  // }
}
