import {
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { OrderItems } from "./purchase";
import { Store } from "./store";
import { Image } from "./photo";

@Entity("Products")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "ProductId" })
  id: string;

  @Column({ name: "ProductName", type: "text", nullable: true })
  product_name: string;

  @Column({ type: "text", name: "ProductDescription", nullable: true })
  product_description: string;

  @Column({ type: "text", name: "ProductCategory", nullable: true })
  product_category: string;

  @Column({ type: "text", name: "UnitOfMeasurement", nullable: true })
  unit_of_measurement: string;

  @Column({ name: "Quantity" })
  quantity: number;

  @Column({ name: "Publish", nullable: false })
  publish: boolean;

  @Column({ nullable: false, name: "UnitPrice", type: "numeric" })
  unit_price: number;

  @Column({ nullable: false })
  StoreId: string;
  @ManyToOne(() => Store, (store) => store.products, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "StoreId",
  })
  store: Store;

  // @OneToMany(() => OrderItems, (orderItems) => orderItems.product)
  // orderItems: OrderItems[];

  @OneToOne(() => Image, (image) => image.product)
  image: Image;
}
