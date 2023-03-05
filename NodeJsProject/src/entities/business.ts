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

enum BusinessType {
  Blog = "Blog",
  eCommerce = "E-commerce",
  Finance = "Financial Services",
}

@Entity("business")
export class Business extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  business_name: string;

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
