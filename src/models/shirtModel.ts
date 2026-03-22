import { Sequelize, Table, Model,  Column, DataType } from "sequelize-typescript";

export type ShirtSizeItem = {
  size: "CH" | "M" | "G" | "XG" | "2XG";
  stock: number;
};

export type ShirtImageItem = {
  url: string;
  publicId?: string;
};

@Table({
    tableName: 'shirts'
})
class Shirts extends Model {
    @Column({
        type: DataType.STRING(100)
    }) declare name: string

    @Column({
    type: DataType.DECIMAL(10, 2),
    }) declare price: string;

    @Column({
        type: DataType.JSONB
    }) declare sizes: ShirtSizeItem[];

    @Column({
        type: DataType.JSONB
    }) declare images: ShirtImageItem[];

    @Column({
        type: DataType.INTEGER
    }) declare stock: number

    @Column({
    type: DataType.BOOLEAN,
    }) declare isActive: boolean;

}

export default Shirts;