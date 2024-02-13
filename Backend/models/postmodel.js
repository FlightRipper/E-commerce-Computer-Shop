import { DataTypes } from 'sequelize';
import sequelize from '../dbconfig.js';
import User from "./usermodel.js";

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    images:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    }
});

User.hasMany(Post);
Post.belongsTo(User);

Post.sync();

export default Post;

