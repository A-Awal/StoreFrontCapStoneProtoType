import { ILike } from "typeorm";
import { Order } from "../entities/order";
import { User } from "../entities/user";
import { OrderItems } from "../entities/purchase";
import { CreditCard } from "../entities/payment_method";
import { Shipping } from "./../entities/shipping_details";

export class CustomerOrder {
  // Get all orders for a user
  getOrders = async (user: User) => {
    const orderDetails = await User.find({
      where: { id: user.id },
      relations: ["orders"],
    });
    return orderDetails;
  };
  
  // Get details of a specific order
  getOrderDetails = async (user: Partial<User>) => {
    const orders = await Order.find({ where: { customer_id: user.id } });
    const shippingDetails = await Shipping.findOne({
      where: { customer_id: user.id },
    });
    const paymentInfo = await CreditCard.findOne({
      where: { customer_id: user.id },
    });
    console.log(`customer orders ${orders} ${shippingDetails} ${paymentInfo}`);

    return { orders, shippingDetails, paymentInfo };
  };
  
  // Get payment details of a specific order
  paymentDetails = async (user: User) => {
    const paymentDetails = await CreditCard.findOne({
      where: { customer_id: user.id },
      relations: ["user"],
    });

    console.log(`customer paymentDetails ${paymentDetails}`);
    return paymentDetails;
  };
}
