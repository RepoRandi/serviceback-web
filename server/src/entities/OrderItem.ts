import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './Order';
import { Service } from './Service';

@Entity()
export class OrderItem {
  @Column({ type: 'integer' })
  quantity!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'text', primary: true })
  orderId!: string;

  @Column({ type: 'text', primary: true })
  serviceId!: string;

  @JoinColumn({ name: 'serviceId' })
  @ManyToOne(
    () => Service,
    service => service.orderItems,
  )
  public service!: Service;

  @JoinColumn({ name: 'orderId' })
  @ManyToOne(
    () => Order,
    order => order.orderItems,
  )
  public order!: Order;
}
