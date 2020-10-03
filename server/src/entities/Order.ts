import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 } from 'uuid';
import { OrderItem } from './OrderItem';
import { Review } from './Review';
import { Service } from './Service';

export enum OrderStatus {
  REQUESTED = 'REQUESTED',
  ASSIGNED = 'ASSIGNED',
  COMPLETED = 'COMPLETED',
}

export enum PaymentStatus {
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  // Add attributes here
  @Column({ type: 'text' })
  userId!: string;

  @Column({ type: 'text' })
  userEmail!: string;

  @Column({ type: 'text' })
  address1!: string;

  @Column({ type: 'text' })
  address2!: string;

  @Column({ type: 'text' })
  postalCode!: string;

  @Column({ type: 'timestamp' })
  datetime!: Date;

  @Column({ type: 'float' })
  totalPrice!: number;

  @Column({ type: 'text', default: OrderStatus.REQUESTED })
  status!: OrderStatus;

  @Column({ type: 'text', default: PaymentStatus.AWAITING_PAYMENT })
  paymentStatus!: PaymentStatus;

  @Column({ type: 'text' })
  paymentProofImageUrl: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(
    () => OrderItem,
    orderItem => orderItem.order,
  )
  orderItems: OrderItem[];

  @ManyToMany(
    () => Service,
    service => service.orders,
  )
  @JoinTable({
    name: 'order_item',
    joinColumn: {
      name: 'orderId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'serviceId',
      referencedColumnName: 'id',
    },
  })
  services: Service[];

  @OneToMany(
    () => Review,
    review => review.order,
  )
  review: Review;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }
}
