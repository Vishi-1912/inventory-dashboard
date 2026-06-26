import { Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { ItemsService } from './items.service';
import { GetItemsDto } from './dtos/get-items.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @UseInterceptors(CacheInterceptor)
    @Get()
    async getItems(@Query() query: GetItemsDto) {
        return await this.itemsService.getItems(query);
    }

    @Post('seed')
    async seedItems() {
        return await this.itemsService.seedItems();
    }
}