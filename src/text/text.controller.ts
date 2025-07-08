import { All, Body, Controller, Get, MethodNotAllowedException, Post } from '@nestjs/common';
import { TextService } from './text.service';

@Controller('text')
export class TextController {
    constructor(private textService: TextService) {}

    @Post('create')
    async createTexts(@Body() items: { text: string }[]): Promise<{ id: string; text: string }[]> {
        return this.textService.createTexts(items);
    }

    @Get()
    async getText() {
        return this.textService.getText();
    }

    @Post()
    async getTextPost() {
        return this.textService.getTextPost();
    }

    @Get('reset')
    async resetIterator() {
        await this.textService.resetIterator();
        return { message: 'Se reinicio el iterador' };
    }

    @All()
    handleOtherMethods() {
        throw new MethodNotAllowedException({ error: 'Verbo incorrecto' });
    }

    
}