import {
  BaseEntity,
  Entity,
  Column,
  JoinColumn,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Product } from "./Product";
import { Order } from "./order";

@Entity("Purchases")
export class OrderItems extends BaseEntity {
  @PrimaryColumn("uuid", { name: "OrderId", nullable: false })
  order_id: string;
  @ManyToOne(() => Order, (order)=> order.orderItems,{ onDelete: "CASCADE" })
  @JoinColumn({ name: "OrderId", referencedColumnName: "id" })
  order: Order;

  // @Column("uuid", { name: "ProductId" })
  // product_id: string;
  // @ManyToOne(() => Product, (product) => product.orderItems)
  // @JoinColumn({ name: "ProductId" })
  // product: Product;

  @CreateDateColumn({  primary: true,
    name: "DatePurchased",
    type: "timestamp with time zone",
  })
  datePurchased: Date;

  @Column({ name: "QuantityPurchased", type: "integer" })
  quantity_purchased: number;

  @Column({ name: "PurchaseState", type: "integer" })
  purchase_state: number;
}
