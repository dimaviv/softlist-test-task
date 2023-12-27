import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize"
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import { ObjectsModule } from './objects/objects.module';
import { OrdersModule } from './orders/orders.module';
import { BookingObject } from "./objects/objects.model";
import { Order } from "./orders/orders.model";
import { JwtModule } from "@nestjs/jwt";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '4h' },
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, BookingObject, Order],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ObjectsModule,
        OrdersModule,
    ]
})
export class AppModule {}