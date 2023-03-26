import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { User } from "../entities/user";

import { Product } from "./product";
import { CreditCard } from "./payment_method";
import { Shipping } from './shipping_details';

@Entity("Stores")
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "StoreId" })
  id: string;

  @Column({ name: "StoreName", nullable: true, type: "text" })
  store_name: string;

  @Column({ name: "Currency", nullable: true, type: "text" })
  currency: string;

  @Column({ name: "CurrencySymbol", nullable: true, type: "text" })
  currency_symbol: string;

  @ManyToOne(() => User, (user) => user.store, { nullable: false })
  @JoinColumn({ name: "MerchantId" })
  user: User;
  @OneToOne(() => CreditCard, (creditCard) => creditCard.store)
  creditCard: CreditCard;

  @OneToMany(() => Product, (products) => products.store, {
    nullable: true,
  })
  products: Product[];

  @OneToOne(() => Shipping, (shipping) => shipping.store, {
    nullable: true,
    onDelete: "CASCADE",
  })
  shipping: Shipping
}
