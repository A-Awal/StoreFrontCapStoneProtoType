import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Store } from './store';
import { User } from './user';

@Entity("ShippingDetails")
export class Shipping extends BaseEntity{
  @PrimaryGeneratedColumn('uuid',{name: "ShippingDetailsId"})
  id: string;

  @Column('uuid', {name:"StoreId"} )
  store_id: string;
  @OneToOne(() => Store, (store) => store.shipping)
  @JoinColumn({
    name: "StoreId",
  })
  store: Store;


  @Column('uuid', {name: "CustomerId"})
  customer_id: string;
  @OneToOne(() => User, (user) => user.shipping, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "CustomerId",
  })
  user:User;

  @Column({ nullable: true,type:"text", name: "Location" })
  location?: string;

}
