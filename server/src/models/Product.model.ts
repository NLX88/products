import {Table, Column, Model, DataType, DefaultScope, Default} from "sequelize-typescript"

@Table({
    tableName: "Product"
})

class Product extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    declare name: String 

    @Column({
        type: DataType.FLOAT
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product