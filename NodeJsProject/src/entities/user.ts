import { Entity, Column, OneToMany, OneToOne, CreateDateColumn } from "typeorm";
import { Person } from "./utils/credential";
import { Store } from "./store";
import { Order } from "./order";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CreditCard } from "./payment_method";
import { Shipping } from './shipping_details';

@Entity("user")
export class User extends Person {
  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  business_name: string;

  @Column({ default: false })
  activated: boolean;

  @Column({ nullable: true })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: "uuid", name: "orderId" })
  order_id?: string;

  @Column({ nullable: true })
  oauth_id?: string;

  @OneToMany(() => Order, (orders) => orders.user, { nullable: true })
  orders: Order[];

  @OneToMany(() => Store, (store) => store.user, {
    nullable: true,
  })
  store: Store[];
  @OneToOne(() => CreditCard, (creditCard) => creditCard.user)
  creditCard: CreditCard;

  @OneToOne(() => Shipping, (shipping) => shipping.user)
  shipping: Shipping

  public async generateAuthToken(): Promise<string> {
    const token = sign({ id: this.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });
    return token;
  }
  public async verifyAuthToken(token: string): Promise<string | JwtPayload> {
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  }
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public async comparePassword(password?: string): Promise<boolean> {
    if (this.password == undefined) {
      return false;
    }
    return bcrypt.compare(password, this.password);
  }
}
