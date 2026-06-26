import { Injectable } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { itemsSeed } from '../../common/constants';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
    ) { }

    getItems() {
        return 'Hello World Items';
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