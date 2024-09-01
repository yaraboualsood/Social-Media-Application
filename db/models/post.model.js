import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from './user.model.js'

const postModel = sequelize.define("post", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

})

postModel.belongsTo(userModel,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "author"
})

userModel.hasMany(postModel, {
    foreignKey: "author"
})

export default postModel

