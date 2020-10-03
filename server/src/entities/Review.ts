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
import { Order } from './Order';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Add attributes here
  @Column({ type: 'text' })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }

  @ManyToOne(
    () => Order,
    order => order.review,
  )
  order: Order;
}
