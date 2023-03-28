import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,JoinColumn, OneToOne } from 'typeorm';
import { Product } from './product';

@Entity({ name: 'Photos' })
export class Image  extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true , name: "Url"})
  url: string;

  @Column({ type: 'uuid', nullable: true,name: "PageId" })
  page_Id: string;

  @Column({ type: 'uuid', nullable: true,name: "TemplateId" })
  template_id: string;

  @Column({ type: 'uuid', nullable: true,name: "ProductId"})
  product_Id: string;
  @OneToOne(() => Product, (product) => product.image, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "ProductId",
  })
  product: Product;
}
