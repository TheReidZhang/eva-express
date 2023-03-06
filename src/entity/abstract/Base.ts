import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity } from 'typeorm';
import { Constructor } from './type';

function Base<TBase extends Constructor>(Base: TBase) {
  abstract class AbstractBase extends Base {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;
  }
  return AbstractBase;
}

export default Base(BaseEntity);
