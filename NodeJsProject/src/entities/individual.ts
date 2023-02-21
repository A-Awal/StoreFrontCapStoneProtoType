import { Entity, Column, OneToMany, OneToOne } from "typeorm";
import { Person } from "./utils/credential";
import { Business } from "./business";
import { Order } from "./order";

enum IndividualType {
  customer = 'Customer',
  business = 'Merchant'
}

@Entity("users")
export class Individual extends Person {
  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  indivdual: IndividualType;

  @OneToOne(() => Order, (order) => order.individual)
  order:Order;

  @OneToMany(() => Business, (business) => business.individual, {
    nullable: true,
  })
  business: Business[];
}