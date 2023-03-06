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
import {ObjectType, Field} from 'type-graphql'

enum Category {
  Blog = "Blog",
  Finance = "Finance",
  Ecommerce = "e-Commerce",
}

@ObjectType()
@Entity("product")
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  category: Category;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  unit: string;

  @Field()
  @Column()
  quantity: string;

  @Field( () => [Order])
  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];

  @Field(() => Business)
  @ManyToOne(() => Business, (business) => business.product, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({
    name: "business_id",
  })
  business: Business;
}
