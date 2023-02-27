import jwt from "jsonwebtoken";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

@Entity("token")
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User, (user) => user.token)
  user: User;
  @Column()
  token: string;

  public verify =async (token : string) => {
    
  }
}

