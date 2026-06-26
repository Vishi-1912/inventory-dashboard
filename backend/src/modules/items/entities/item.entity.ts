import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Category } from '../../../common/constants';
import { AuditLog } from '../../audit-logs/entities/audit-logs.entity';

@Entity('items')
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', length: 100 })
    name: string;

    @Column({ name: 'sku', unique: true })
    sku: string;

    @Column({ name: 'category', type: 'enum', enum: Category })
    category: Category;

    @Column({ name: 'stock_count', type: 'int', default: 0 })
    stockCount: number;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => AuditLog, (auditLog) => auditLog.item)
    auditLogs: AuditLog[];
}