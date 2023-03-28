import { Entity, JoinColumn, OneToOne, Column, BaseEntity, PrimaryColumn } from "typeorm";
import { User } from "./user";
import { Store } from "./store";

@Entity("CreditCardDetails")
export class CreditCard extends BaseEntity {
  @PrimaryColumn("uuid", {  name: "CustomerId" })
  customer_id: string;
  @OneToOne(() => User, (user) => user.creditCard, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "CustomerId", referencedColumnName: "id" })
  user: User;

  @PrimaryColumn("uuid", {  name: "StoreId" })
  store_id: string;
  @OneToOne(() => Store, (store) => store.creditCard, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "StoreId" })
  store: Store;

  @Column({ type: "text", name: "Name", nullable: true })
  name: string;

  @Column({ type: "text", name: "Number", nullable: true })
  number: string;

  @Column({ type: "text", name: "ExpiryYear", nullable: true })
  expiry_year: string;

  @Column({ type: "text", name: "ExpiryMonth", nullable: true })
  expiry_month: string;

  @Column({ type: "text", name: "Cvc", nullable: true })
  cvc: string;
}
