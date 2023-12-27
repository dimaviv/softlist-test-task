import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./orders.model";
import { ObjectsModule } from "../objects/objects.module";
import { AuthModule } from "../auth/auth.module";


@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports:[
    AuthModule,
    ObjectsModule,
    SequelizeModule.forFeature([Order])
  ]
})
export class OrdersModule {}
