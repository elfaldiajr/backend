import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './user/user.schema';
import { UserModule } from './user/user.module';
import { TextModule } from './text/text.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/prueba'),
        UserModule,TextModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
