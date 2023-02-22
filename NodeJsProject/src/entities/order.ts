import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne } from "typeorm";
import { Individual } from "./individual";
import { Product } from "./product";

@Entity('order')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany( () => Product, (product)=> product.order)
  product: Product[];

  @OneToOne(()=> Individual, (indivdual)=> indivdual.order )
  individual: Individual;

  @Column({ nullable: true })
  Quantity: number;
}