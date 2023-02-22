import { Entity, Column, OneToMany, OneToOne } from "typeorm";
import { Person } from "./utils/credential";
import { Business } from "./business";
import { Order } from "./order";

enum IndividualType {
  customer = 'Customer',
  business = 'Merchant'
}

@Entity("user")
export class Individual extends Person {
  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  role: IndividualType;

  @OneToOne(() => Order, (order) => order.individual,{nullable: true})
  order:Order;

  @OneToMany(() => Business, (business) => business.individual, {
    nullable: true,
  })
  business: Business[];
}