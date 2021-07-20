import Sequelize from 'sequelize';
import User from './userModel.js';

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Product = sequelize.define(
  'product',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    brand: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rating: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    numReviews: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    countInStock: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User, // This is a reference to another model
        key: 'id', // This is the column name of the referenced model
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE, // This declares when to check the foreign key constraint. PostgreSQL only.
      },
    },
  },
  {
    // options
    freezeTableName: true,
  }
);

const Review = sequelize.define(
  'review',
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
    rating: { type: Sequelize.DECIMAL, allowNull: false },
    comment: { type: Sequelize.STRING, allowNull: false },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Product.hasMany(Review);
Review.belongsTo(Product);

export { Product, Review };
