import { Module } from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { ObjectsController } from './objects.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { BookingObject } from "./objects.model";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [ObjectsController],
  providers: [ObjectsService],
  imports:[
    AuthModule,
    SequelizeModule.forFeature([BookingObject])
  ],
  exports:[
    ObjectsService,
  ]
})
export class ObjectsModule {}
