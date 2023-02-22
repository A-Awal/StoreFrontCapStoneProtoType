import {
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Business } from "./business";
import { Order } from "./order";


enum Category {
  Blog = "Blog",
  Finance = "Finance",
  Ecommerce = "e-Commerce"
}

@Entity("product")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: Category;

  @Column()
  description: string;

  @Column()
  unit: string;

  @Column()
  quantuty: string;

  @ManyToOne(() => Order, (order) => order.product)
  @JoinColumn()
  order: Order[];

  @ManyToOne(() => Business, (business) => business.product, {nullable : true})
  @JoinColumn()
  business: Business;
}
