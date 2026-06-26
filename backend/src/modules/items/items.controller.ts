import { Controller, Get, Post, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { GetItemsDto } from './dtos/get-items.dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get()
    async getItems(@Query() query: GetItemsDto) {
        return await this.itemsService.getItems(query);
    }

    @Post('seed')
    async seedItems() {
        return await this.itemsService.seedItems();
    }
}