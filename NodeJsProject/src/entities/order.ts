import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
} from "typeorm";
import { OrderItems } from "./purchase";
import { User } from "./user";
// import { OrderItems } from "./purchase";

@Entity("Orders")
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "OrderId" })
  id: string;

  @Column({name: "CustomerId"})
  customer_id: string
  @ManyToOne(() => User, (user) => user.orders, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "CustomerId" })
  user: User;

  @CreateDateColumn({ name: "DateOrdered", type: "timestamp with time zone" })
  date_ordered: Date;

  @Column("numeric", { name: "TotalAmount" })
  total_amount: number;

  @Column({ name: "OrderState" })
  order_state: number;

  @OneToOne(() => OrderItems, (orderItems) => orderItems.order)
  orderItems: OrderItems;
}
