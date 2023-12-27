import { Table, Column, Model, DataType, HasMany, BelongsToMany } from "sequelize-typescript";
import { Order } from '../orders/orders.model';
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";


export interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string;

}

@Table({
    tableName: 'users'
})

export class User extends Model<User> implements IUser {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Order)
    orders: Order[];

}
