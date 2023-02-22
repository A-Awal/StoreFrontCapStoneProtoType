import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Individual } from "./individual";
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
  businessName: string;

  @Column()
  businesType: BusinessType;

  @ManyToOne(() => Individual, (individual) => individual.business)
  @JoinColumn()
  individual: Individual;

  @OneToMany(() => Product, (product) => product.business, {
    nullable: true,
  })
  product: Product[];
}
