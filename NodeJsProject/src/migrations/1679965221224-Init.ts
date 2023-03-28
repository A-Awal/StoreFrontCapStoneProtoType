import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1679965221224 implements MigrationInterface {
    name = 'Init1679965221224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "Photos" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "Url" text,
                "PageId" uuid,
                "TemplateId" uuid,
                "ProductId" uuid,
                CONSTRAINT "REL_9db7d8390b7d3854768b6c401f" UNIQUE ("ProductId"),
                CONSTRAINT "PK_60d73e2714a914f2cf23e026014" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Products" (
                "ProductId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "ProductName" text,
                "ProductDescription" text,
                "ProductCategory" text,
                "UnitOfMeasurement" text,
                "Quantity" integer NOT NULL,
                "Publish" boolean NOT NULL,
                "UnitPrice" numeric NOT NULL,
                "StoreId" uuid NOT NULL,
                CONSTRAINT "PK_5fb01991b1b726954a6230c9747" PRIMARY KEY ("ProductId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "CreditCardDetails" (
                "CustomerId" uuid NOT NULL,
                "StoreId" uuid NOT NULL,
                "Name" text,
                "Number" text,
                "ExpiryYear" text,
                "ExpiryMonth" text,
                "Cvc" text,
                CONSTRAINT "PK_8300f3dd366f03207d2bd290eef" PRIMARY KEY ("CustomerId", "StoreId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "ShippingDetails" (
                "ShippingDetailsId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "StoreId" uuid NOT NULL,
                "CustomerId" uuid NOT NULL,
                "Location" text,
                CONSTRAINT "REL_aae487c6f0660ac22b6f8a3ce4" UNIQUE ("StoreId"),
                CONSTRAINT "REL_718076057c2205bc50cd1b5a6a" UNIQUE ("CustomerId"),
                CONSTRAINT "PK_692a5496a2270fa86123da81680" PRIMARY KEY ("ShippingDetailsId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Stores" (
                "StoreId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "StoreName" text,
                "Currency" text,
                "CurrencySymbol" text,
                "MerchantId" uuid NOT NULL,
                CONSTRAINT "PK_d23f306e16cd758dcaaf08d8e53" PRIMARY KEY ("StoreId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Purchases" (
                "OrderId" uuid NOT NULL,
                "DatePurchased" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "QuantityPurchased" integer NOT NULL,
                "PurchaseState" integer NOT NULL,
                CONSTRAINT "PK_95f4ef27002d1c5a2414cd65da9" PRIMARY KEY ("OrderId", "DatePurchased")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "Orders" (
                "OrderId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "CustomerId" uuid NOT NULL,
                "DateOrdered" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "TotalAmount" numeric NOT NULL,
                "OrderState" integer NOT NULL,
                CONSTRAINT "PK_8cc59d4424f9599b06b8aba8a5b" PRIMARY KEY ("OrderId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying,
                "password" character varying,
                "phone_number" character varying,
                "first_name" character varying,
                "last_name" character varying,
                "business_name" character varying,
                "activated" boolean NOT NULL DEFAULT false,
                "role" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "orderId" uuid,
                "oauth_id" character varying,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "token" (
                "id" SERIAL NOT NULL,
                "user_id" character varying NOT NULL,
                "activation_code" character varying NOT NULL,
                "token" character varying NOT NULL,
                CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "Photos"
            ADD CONSTRAINT "FK_9db7d8390b7d3854768b6c401ff" FOREIGN KEY ("ProductId") REFERENCES "Products"("ProductId") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Products"
            ADD CONSTRAINT "FK_8e2117a7698817fe6d26224b015" FOREIGN KEY ("StoreId") REFERENCES "Stores"("StoreId") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "CreditCardDetails"
            ADD CONSTRAINT "FK_8e4dc6e63abc93b225c7c0f155c" FOREIGN KEY ("CustomerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "CreditCardDetails"
            ADD CONSTRAINT "FK_a790d8a04a185bc6a19e2c1a720" FOREIGN KEY ("StoreId") REFERENCES "Stores"("StoreId") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "ShippingDetails"
            ADD CONSTRAINT "FK_aae487c6f0660ac22b6f8a3ce4c" FOREIGN KEY ("StoreId") REFERENCES "Stores"("StoreId") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "ShippingDetails"
            ADD CONSTRAINT "FK_718076057c2205bc50cd1b5a6ac" FOREIGN KEY ("CustomerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Stores"
            ADD CONSTRAINT "FK_d5f13b2acd0d52071f63f8134ad" FOREIGN KEY ("MerchantId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Purchases"
            ADD CONSTRAINT "FK_de4f9df23ac32a9765854885be0" FOREIGN KEY ("OrderId") REFERENCES "Orders"("OrderId") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "Orders"
            ADD CONSTRAINT "FK_5b6db28f37da13d00e9c3d1ab3a" FOREIGN KEY ("CustomerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "Orders" DROP CONSTRAINT "FK_5b6db28f37da13d00e9c3d1ab3a"
        `);
        await queryRunner.query(`
            ALTER TABLE "Purchases" DROP CONSTRAINT "FK_de4f9df23ac32a9765854885be0"
        `);
        await queryRunner.query(`
            ALTER TABLE "Stores" DROP CONSTRAINT "FK_d5f13b2acd0d52071f63f8134ad"
        `);
        await queryRunner.query(`
            ALTER TABLE "ShippingDetails" DROP CONSTRAINT "FK_718076057c2205bc50cd1b5a6ac"
        `);
        await queryRunner.query(`
            ALTER TABLE "ShippingDetails" DROP CONSTRAINT "FK_aae487c6f0660ac22b6f8a3ce4c"
        `);
        await queryRunner.query(`
            ALTER TABLE "CreditCardDetails" DROP CONSTRAINT "FK_a790d8a04a185bc6a19e2c1a720"
        `);
        await queryRunner.query(`
            ALTER TABLE "CreditCardDetails" DROP CONSTRAINT "FK_8e4dc6e63abc93b225c7c0f155c"
        `);
        await queryRunner.query(`
            ALTER TABLE "Products" DROP CONSTRAINT "FK_8e2117a7698817fe6d26224b015"
        `);
        await queryRunner.query(`
            ALTER TABLE "Photos" DROP CONSTRAINT "FK_9db7d8390b7d3854768b6c401ff"
        `);
        await queryRunner.query(`
            DROP TABLE "token"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "Orders"
        `);
        await queryRunner.query(`
            DROP TABLE "Purchases"
        `);
        await queryRunner.query(`
            DROP TABLE "Stores"
        `);
        await queryRunner.query(`
            DROP TABLE "ShippingDetails"
        `);
        await queryRunner.query(`
            DROP TABLE "CreditCardDetails"
        `);
        await queryRunner.query(`
            DROP TABLE "Products"
        `);
        await queryRunner.query(`
            DROP TABLE "Photos"
        `);
    }

}
