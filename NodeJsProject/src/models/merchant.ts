import { Column, OneToMany } from "typeorm";
import { Person } from "./utils/credential";
import { Business } from "./business";

export class Merchant extends Person {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @OneToMany(() => Business, (business) => business.merchant)
  business: Business[];
}


