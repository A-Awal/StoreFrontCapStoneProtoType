import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("token")
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: "user_id" })
    user_id!: string;
    @Column({ name: "activation_code" })
    activation_code!: string;
    @Column()
    token!: string;
}
