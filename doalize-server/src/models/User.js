import { DataTypes } from 'sequelize';

import sequelize from '../config/database.js';


const User = sequelize.define(
  'User',
  {

    id: {
      type: DataTypes.INTEGER,

      primaryKey: true,

      autoIncrement: true,
    },


    name: {
      type: DataTypes.STRING,

      allowNull: false,
    },


    email: {
      type: DataTypes.STRING,

      allowNull: false,

      unique: true,
    },


    password: {
      type: DataTypes.STRING,

      allowNull: false,
    },


    photo: {
      type: DataTypes.TEXT,

      allowNull: true,
    },


    description: {
      type: DataTypes.TEXT,

      allowNull: true,
    },


    location: {
      type: DataTypes.STRING,

      allowNull: true,
    },

  },
  {

    tableName: 'users',

    timestamps: true,

    createdAt: 'created_at',

    updatedAt: false,
  }
);


export default User;