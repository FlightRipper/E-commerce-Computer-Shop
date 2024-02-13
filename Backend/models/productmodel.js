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
    images:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    featured:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

SubCategory.hasMany(Product);
Product.belongsTo(SubCategory);

Product.sync();

export default Product;

