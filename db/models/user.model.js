import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";

const userModel = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps:false
})

export default userModel