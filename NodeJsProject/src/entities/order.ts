import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, CreateDateColumn, JoinTable, ManyToMany} from "typeorm";
import { User } from "./user";
import { Product } from "./product";
import {ObjectType, Field} from 'type-graphql'

@ObjectType()
@Entity("order")
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Product])
  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({
    name: "orders_product",
    joinColumn: {
      name : "order",
      referencedColumnName : "id"
    },
    inverseJoinColumn: {
      name: "product",
      referencedColumnName : "id"
    }
  })

  products: Product[];

  @Field(() => User)
  @OneToOne(() => User, (user) => user.order, )
  user: User;

  @Field()
  @Column({ nullable: true })
  Quantity: number;

  @Field( () => Date)
  @CreateDateColumn()
  created_at: Date;
}