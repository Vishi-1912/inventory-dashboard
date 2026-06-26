import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './entities/audit-logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  controllers: [],
  providers: [],
})
export class AuditLogsModule {}