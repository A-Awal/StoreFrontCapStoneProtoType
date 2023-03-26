import {
  BaseEntity,
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Product } from "./Product";
import { Order } from "./order";

@Entity("Purchases")
export class OrderItems extends BaseEntity {
  @Column("uuid", { primary: true, name: "OrderId", nullable: false })
  order_id: string;
  @OneToOne(() => Order, { onDelete: "CASCADE" })
  @JoinColumn({ name: "OrderId", referencedColumnName: "id" })
  order: Order;

  // @Column({ name: "ProductId" })
  // product_id: string;
  // @OneToMany(() => Product, (products) => products.orderItems)
  // @JoinColumn({ name: "ProductId" })
  // products: Product[];

  @CreateDateColumn({
    name: "DatePurchased",
    type: "timestamp with time zone",
  })
  datePurchased: Date;

  @Column({ name: "QuantityPurchased", type: "integer" })
  quantity_purchased: number;

  @Column({ name: "PurchaseState", type: "integer" })
  purchase_state: number;
}
