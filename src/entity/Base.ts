'use strict';

import { IsDate, IsOptional } from 'class-validator';
// third-party node modules
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity } from 'typeorm';

abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @CreateDateColumn()
  @IsOptional()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsOptional()
  @IsDate()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @IsOptional()
  @IsDate()
  deletedAt: Date | null;
}

export default Base;
