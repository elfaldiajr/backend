import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Text } from './text.schema';

@Injectable()
export class TextService {
    private currentIndex = -1;

    constructor(
            @InjectModel(Text.name) private textModel: Model<Text &  { _id: Types.ObjectId }>,
        ) {}

    async getTextPost(): Promise<{ texto: string }> {
        if (this.currentIndex === -1) {
            throw new HttpException('No hay texto actual disponible', HttpStatus.PRECONDITION_REQUIRED);
        }
        const allTexts = await this.textModel.find().sort('order').exec();      
        if (this.currentIndex >= allTexts.length) {
            throw new HttpException({ error: 'Índice fuera de rango' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return { texto: allTexts[this.currentIndex].text };
    }

    async getText(): Promise<{ texto: string }> {
        const allTexts = await this.textModel.find().sort('order').exec();
    
        if (this.currentIndex >= allTexts.length - 1) {
        throw new HttpException('Ya estamos en el final', HttpStatus.GONE);
        }

        this.currentIndex++;
        return { texto: allTexts[this.currentIndex].text };
    }

    async resetIterator(): Promise<void> {
        this.currentIndex = -1;
    }

    async createTexts(items: { text: string }[]): Promise<{ id: string; text: string }[]> {
        const createdTexts = await this.textModel.insertMany(items);
        return createdTexts.map(item => ({
        id: item._id.toString(),
        text: item.text,
        }));
    }
}