import { Entity, Column, OneToMany, OneToOne } from "typeorm";
import { Person } from "./utils/credential";
import { Business } from "./business";
import { Order } from "./order";
import jwt from "jsonwebtoken"
import  bcrypt  from "bcrypt";




export enum IndividualType {
  customer = "customer",
  business = "business"
}


@Entity("user")
export class Individual extends Person {
  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({nullable: true})
  business_name : string;

  @Column()
  role: IndividualType;

  @OneToOne(() => Order, (order) => order.individual, { nullable: true })
  order: Order;

  @OneToMany(() => Business, (business) => business.individual, {
    nullable: true,
  })
  business: Business[];

  public  generateAuthToken(): string {
    const token = jwt.sign({ id: this.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "4",
    });
    return token;
  }
  public async hashPassword(password): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public async comparePassword(password): Promise<boolean> {
    return await bcrypt.compare(password, this.password);;
  }
}