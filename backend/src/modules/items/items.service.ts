import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, itemsSeed } from '../../common/constants';
import { GetItemsDto } from './dtos/get-items.dto';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
    ) { }

    async getItems(query: GetItemsDto) {
        try {
            const { page = 1, limit = 10, category } = query;

            const [items, total] = await this.itemRepository.findAndCount({
                where: category ? { category: category as Category } : {},
                skip: (page - 1) * limit,
                take: limit,
                order: {
                    updatedAt: 'DESC',
                },
            });

            return {
                success: true,
                data: items,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            throw new Error('Failed to get items');
        }
    }

    async seedItems() {
        try {
            const count = await this.itemRepository.count();

            if (count > 0) {
                return {
                    success: true,
                    message: 'Database already seeded',
                    total: count,
                };
            }

            await this.itemRepository.save(itemsSeed);

            return {
                success: true,
                message: 'Database seeded successfully',
                total: itemsSeed.length,
            };
        } catch (error) {
            throw new Error('Failed to seed items');
        }
    }
}