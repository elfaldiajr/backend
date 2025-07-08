import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Text, TextSchema } from './text.schema';
import { TextService } from './text.service';
import { TextController } from './text.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Text.name, schema: TextSchema }])],
  controllers: [TextController],
  providers: [TextService],
})
export class TextModule {
}