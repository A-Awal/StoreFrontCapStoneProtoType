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
import {ObjectType, Field} from 'type-graphql'



export enum UserType {
  customer = "customer",
  business = "business",
}

@ObjectType()
@Entity("user")
export class User extends Person {
  @Field()
  @Column({ nullable: true })
  first_name: string;

  @Field()
  @Column({ nullable: true })
  last_name: string;

  @Field()
  @Column({ nullable: true })
  business_name: string;

  @Field()
  @Column({ default: false })
  activated: boolean;

  @Field()
  @Column({ type: "enum", enum: UserType })
  role: string;

  @Field()
  @OneToOne(() => Order, (order) => order.user, { nullable: true })
  order: Order;

  @Field(() => [Business])
  @OneToMany(() => Business, (business) => business.user, {
    nullable: true,
  })
  business: Business[];

  @Field()
  @CreateDateColumn()
  created_at: Date;

  public async generateAuthToken(): Promise<string> {
    const token = jwt.sign({ id: this.id },"secretepassword",{expiresIn: "5h"});
    return token;
  }
  
  public async hashPassword(password: string): Promise<string> {
    // const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hash = await bcrypt.hash(password, 12);
    return hash;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
