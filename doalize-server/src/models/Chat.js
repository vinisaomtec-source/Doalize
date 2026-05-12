import { DataTypes } from 'sequelize';

import sequelize from '../config/database.js';

import User from './User.js';


const Chat = sequelize.define(
  'Chat',
  {

    id: {
      type: DataTypes.INTEGER,

      primaryKey: true,

      autoIncrement: true,
    },


    user_one_id: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },


    user_two_id: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },


    last_message: {
      type: DataTypes.TEXT,

      allowNull: true,
    },


    last_message_time: {
      type: DataTypes.DATE,

      allowNull: true,
    },

  },
  {

    tableName: 'chats',

    timestamps: true,

    createdAt: 'created_at',

    updatedAt: 'updated_at',
  }
);


// RELACIONAMENTOS
Chat.belongsTo(User, {
  foreignKey: 'user_one_id',

  as: 'userOne',
});


Chat.belongsTo(User, {
  foreignKey: 'user_two_id',

  as: 'userTwo',
});


export default Chat;