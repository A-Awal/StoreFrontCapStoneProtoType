import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  CreateDateColumn,
} from "typeorm";
import { Person } from "./utils/credential";
import { Business } from "./business";
import { Order } from "./order";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";


export enum UserType {
  customer = "customer",
  business = "business",
}

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

  @Column({ type: "enum", enum: UserType })
  role: string;

  @OneToOne(() => Order, (order) => order.user, { nullable: true })
  order: Order;

  @OneToMany(() => Business, (business) => business.user, {
    nullable: true,
  })
  business: Business[];

  @CreateDateColumn()
  created_at: Date;

  public async generateAuthToken(): Promise<string> {
    const token = jwt.sign(
      { id: this.id },
      crypto.randomBytes(32).toString("hex"),
      {
        expiresIn: "5h",
      }
    );
    return token;
  }
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
