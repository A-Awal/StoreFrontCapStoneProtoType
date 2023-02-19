import { BaseEntity, Column, ManyToOne } from "typeorm";
import { Merchant } from "./merchant";

enum BusinessType {
    Blog = 'Blog',
    eCommerce = 'E-commerce',
    Finance = 'Financial Services'

}



export class Business {
  @Column()
  businessName: string;

  @Column()
  businesType: BusinessType;

  
  @ManyToOne(() => Merchant, (merchant) => merchant.business)
  merchant: Merchant;
}