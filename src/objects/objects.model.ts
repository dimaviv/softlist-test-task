import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Order } from "../orders/orders.model";


export interface IBookingObject {
    id?: number;
    name: string;
    description: string;
    availableUnits: number;
    pricePerUnit: number;
}

@Table({
    tableName: 'objects'
})
export class BookingObject extends Model<BookingObject> implements IBookingObject {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    description: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    availableUnits: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    pricePerUnit: number;

    @HasMany(() => Order)
    orders: Order[];

}
