import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique:true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({unique: true,})
  phoneNumber: number;
}
