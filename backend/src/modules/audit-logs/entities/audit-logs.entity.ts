import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Item } from '../../items/entities/item.entity';

@Entity('audit_logs')
export class AuditLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, (item) => item.auditLogs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'item_id' })
    item: Item;

    @Column({ name: 'changed_by', length: 100 })
    changedBy: string;

    @Column({ name: 'old_value', type: 'jsonb', nullable: true })
    oldValue: Record<string, any>;

    @Column({ name: 'new_value', type: 'jsonb', nullable: true })
    newValue: Record<string, any>;

    @CreateDateColumn()
    timestamp: Date;
}