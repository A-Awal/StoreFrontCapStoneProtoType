import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, CreateDateColumn, JoinTable, ManyToMany} from "typeorm";
import { User } from "./user";
import { Product } from "./product";

@Entity("order")
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({
    name: "orders_product",
    joinColumn: {
      name : "order",
      referencedColumnName : "id"
    },
    inverseJoinColumn: {
      name: "product",
      referencedColumnName : "id"
    }
  })
  products: Product[];

  @OneToOne(() => User, (user) => user.order, )
  user: User;

  @Column({ nullable: true })
  Quantity: number;

  @CreateDateColumn()
  created_at: Date;
}