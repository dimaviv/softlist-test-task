import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { BookingObject } from '../objects/objects.model';
import { User } from "../users/users.model";



export interface IOrder {
    id?: number;
    bookingObjectId: number;
    quantity: number;
    startDate: Date;
    endDate: Date;
    userId: number;
}


@Table({
    tableName: 'orders'
})
export class Order extends Model<Order> implements IOrder {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ForeignKey(() => BookingObject)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    bookingObjectId: number;

    @BelongsTo(() => BookingObject)
    bookingObject: BookingObject;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quantity: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    startDate: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    endDate: Date;

}
