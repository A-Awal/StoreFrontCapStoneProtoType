import {
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";
import { Business } from "./business";
import { Order } from "./order";

enum Category {
  Blog = "Blog",
  Finance = "Finance",
  Ecommerce = "e-Commerce",
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
  quantity: string;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];

  @ManyToOne(() => Business, (business) => business.product, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({
    name: "business_id",
  })
  business: Business;
}
