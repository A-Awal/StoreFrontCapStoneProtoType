import { ILike } from "typeorm";
import { Order } from "../entities/order";
import { User } from "../entities/user";
import { OrderItems } from "../entities/purchase";
import { CreditCard } from "../entities/payment_method";
import { Shipping } from "./../entities/shipping_details";

import { Image } from "../entities/photo";

export class CustomerOrder {
  // private getOrderedProductDetails = async (order : OrderItems) => {
  //   const orderDetails = {};

  //   order.products.forEach(async (product) => {
  //     if (orderDetails["product"]) {
  //       orderDetails["product"]["quantity"] += 1;
  //       orderDetails["product"]["total_price"] += Number(product.unit_price);
  //     } else {
  //       orderDetails["product"] = product;
  //       orderDetails["product"]["id"];
  //       orderDetails["product"]["unit_price"] = 1;
  //       orderDetails["product"]["quantity"] = 1;
  //       orderDetails["product"]["total_price"] = Number(product.unit_price);
  //     }
  //     orderDetails["product"]["image"] = await (
  //       await Image.findOne({ where: { product_Id: product.id } })
  //     ).url;
  //   });

  //   return orderDetails;
  // };

  // Get all orders for a user
  getOrders = async (
    user: Partial<User>
  ): Promise<{ first_name: string; last_name: string; orders: Order[] }> => {
    try {
      if (!user || !user.id) {
        throw new Error("Invalid user object");
      }
      const ordersLog = await User.findOne({
        where: { id: user.id },
        relations: ["orders"],
      });

      console.log(ordersLog);
      const { first_name, last_name, orders } = ordersLog;
      return { first_name, last_name, orders };
    } catch (err) {
      console.error(`Error in getOrders(): ${err}`);
      throw new Error("Failed to get orders for user");
    }
  };

  // Get details of a specific order
  getOrderDetails = async (
    user: Partial<User>
  ): Promise<{
    order: any;
    shippingDetails: Shipping;
    paymentInfo: CreditCard;
  }> => {
    try {
      if (!user.id) {
        throw new Error("Invalid user ID");
      }

      const order = await OrderItems.findOne({
        where: { order_id: user.order_id },
        relations: ["products"],
      });

      // const orderDetails = await this.getOrderedProductDetails(order);

      const shippingDetails = await Shipping.findOne({
        where: { customer_id: user.id },
      });
      const paymentInfo = await CreditCard.findOne({
        where: { customer_id: user.id },
      });
      return { 
        order, shippingDetails, paymentInfo };
    } catch (err) {
      console.error(`Error in getting order details(): ${err}`);
      throw new Error("Failed to get order details");
    }
  };

  // Get payment details of a specific order
  paymentDetails = async (userId: string): Promise<CreditCard> => {
    try {
      if (!userId) {
        throw new Error("Invalid user ID");
      }
      const paymentDetails = await CreditCard.findOne({
        where: { customer_id: userId },
        relations: ["user"],
      });
      return paymentDetails;
    } catch (err) {
      console.error(`Error in paymentDetails(): ${err}`);
      throw new Error("Failed to get payment details");
    }
  };

  //make an order
}
