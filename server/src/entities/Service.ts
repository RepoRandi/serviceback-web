import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { v4 } from 'uuid';
import { Order } from './Order';
import { OrderItem } from './OrderItem';
import { ServiceCategory } from './ServiceCategory';

export enum ServiceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Add attributes here
  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  additionalDetails!: string;

  @Column({ type: 'text' })
  imageUrl!: string;

  @Column({ type: 'text', unique: true })
  slug!: string;

  @Column({ type: 'float' })
  price!: number;

  @Column({ type: 'float' })
  cashbackPercent!: number;

  @Column({ type: 'integer' })
  durationMinutes!: number;

  @Column({ type: 'text' })
  quantityUnit!: string;

  @Column({ type: 'text', default: ServiceStatus.ACTIVE })
  status!: ServiceStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }

  @ManyToOne(
    () => ServiceCategory,
    serviceCategory => serviceCategory.services,
  )
  serviceCategory!: ServiceCategory;

  @OneToMany(
    () => OrderItem,
    orderItem => orderItem.service,
  )
  orderItems!: OrderItem[];

  @ManyToMany(
    () => Order,
    order => order.services,
  )
  orders: Order[];
}
