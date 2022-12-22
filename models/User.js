const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // CHECK HASHED PASSWORD WITH ENTERED PASSWORD ON LOGIN
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        // HASHING THE PASSWORD BEFORE CREATING THE ACCOUNT IN THE DB AND BEFORE UPDATING THE ACCOUNT
        hooks: {
            beforeCreate: async (bcryptData) => {
                bcryptData.password = await bcrypt.hash(bcryptData.password, 10);
                return bcryptData;
            },
            beforeUpdate: async (bcryptData) => {
                bcryptData.password = await bcrypt.hash(bcryptData.password, 10);
                return bcryptData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;