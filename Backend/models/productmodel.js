import { DataTypes } from 'sequelize';
import sequelize from '../dbconfig.js';
import SubCategory from "./subcategorymodel.js";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('images'));
        },
        set(val) {
            this.setDataValue('images', JSON.stringify(val));
        }
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    featured:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

Product.belongsTo(SubCategory, { foreignKey: 'subcategoryId' });

Product.sync();

export default Product;

