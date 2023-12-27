import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./orders.model";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ObjectsService } from "../objects/objects.service";
import { Sequelize } from "sequelize-typescript";


@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private ordersRepository: typeof Order,
    private readonly objectsService:ObjectsService,
    private sequelize: Sequelize,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    return this.sequelize.transaction(async (transaction) => {
      await this.objectsService.decrementAvailableUnits(createOrderDto.bookingObjectId, createOrderDto.quantity, transaction);

      const order = new this.ordersRepository({
        ...createOrderDto,
        userId,
      });

      return order.save({ transaction });
    });
  }

  async findAll(userId: number): Promise<Order[]> {
    return this.ordersRepository.findAll({ where: { userId } });
  }

  async findOne(userId: number, orderId: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id: orderId, userId } });
    await this.isOwner(order, userId);
    return order;
  }

  async update(userId: number, orderId: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.sequelize.transaction(async (transaction) => {
      const order = await this.ordersRepository.findOne({ where: { id: orderId, userId }, transaction });
      await this.isOwner(order, userId);

      const quantityChange = order.quantity - updateOrderDto.quantity;
      if (quantityChange > 0) {
        await this.objectsService.incrementAvailableUnits(order.bookingObjectId, quantityChange, transaction);
      }

      await order.update(updateOrderDto, { transaction });
      return order;
    });
  }


  async remove(userId: number, orderId: number): Promise<void> {
    return this.sequelize.transaction(async (transaction) => {
      const order = await this.ordersRepository.findOne({ where: { id: orderId, userId }, transaction });
      await this.isOwner(order, userId);

      await this.objectsService.incrementAvailableUnits(order.bookingObjectId, order.quantity, transaction);
      await order.destroy({ transaction });
    });
  }


  private async isOwner(order: Order, userId: number) {
    if (!order || order.userId !== userId) {
      throw new UnauthorizedException('User is not the owner of the order');
    }
  }
}
