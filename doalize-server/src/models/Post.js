import { DataTypes } from 'sequelize';

import sequelize from '../config/database.js';

import User from './User.js';


const Post = sequelize.define(
  'Post',
  {

    id: {
      type: DataTypes.INTEGER,

      primaryKey: true,

      autoIncrement: true,
    },


    user_id: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },


    description: {
      type: DataTypes.TEXT,

      allowNull: false,
    },


    images: {
      type: DataTypes.JSON,

      allowNull: false,
    },


    promoted: {
      type: DataTypes.BOOLEAN,

      defaultValue: false,
    },

  },
  {

    tableName: 'posts',

    timestamps: true,

    createdAt: 'created_at',

    updatedAt: false,
  }
);


// RELACIONAMENTO
Post.belongsTo(User, {
  foreignKey: 'user_id',

  as: 'user',
});


export default Post;