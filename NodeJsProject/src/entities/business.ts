import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Product } from "./product";
import {ObjectType, Field} from 'type-graphql';

enum BusinessType {
  Blog = "Blog",
  eCommerce = "E-commerce",
  Finance = "Financial Services",
}
@ObjectType()
@Entity("business")
export class Business extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  business_name: string;

  @Field()
  @Column()
  businesType: BusinessType;

  @ManyToOne(() => User, (user) => user.business,)
  @JoinColumn({name: "user_id"})
  user: User;

  @OneToMany(() => Product, (product) => product.business, {
    nullable: true,
  })
  product: Product[];
}
