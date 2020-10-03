import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Add attributes here

  @Column({ type: 'text' })
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }
}
