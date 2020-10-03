import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { v4 } from 'uuid';
import { Bank } from './Bank';

@Entity()
export class UserBankAccount {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Add attributes here
  @Column({ type: 'text' })
  userId!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  accountNumber!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }

  @ManyToOne(() => Bank)
  bank!: Bank;
}
