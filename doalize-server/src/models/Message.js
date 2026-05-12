import { DataTypes } from 'sequelize';

import sequelize from '../config/database.js';

import User from './User.js';


const Message = sequelize.define(
  'Message',
  {

    id: {
      type: DataTypes.INTEGER,

      primaryKey: true,

      autoIncrement: true,
    },


    sender_id: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },


    receiver_id: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },


    message: {
      type: DataTypes.TEXT,

      allowNull: true,
    },


    image: {
      type: DataTypes.TEXT,

      allowNull: true,
    },


    audio: {
      type: DataTypes.TEXT,

      allowNull: true,
    },

  },
  {

    tableName: 'messages',

    timestamps: true,

    createdAt: 'created_at',

    updatedAt: false,
  }
);


// RELACIONAMENTOS
Message.belongsTo(User, {
  foreignKey: 'sender_id',

  as: 'sender',
});


Message.belongsTo(User, {
  foreignKey: 'receiver_id',

  as: 'receiver',
});


export default Message;