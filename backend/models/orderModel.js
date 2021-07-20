import Sequelize from 'sequelize';
import { Product } from './productModel.js';
import User from './userModel.js';
const sequelize = new Sequelize(process.env.DATABASE_URL);

const Order = sequelize.define(
  'order',
  {
    paymentMethod: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    taxPrice: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0.0,
    },
    shippingPrice: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0.0,
    },
    totalPrice: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0.0,
    },
    isPaid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    paidAt: {
      type: Sequelize.DATE,
    },
    isDelivered: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deliveredAt: {
      type: Sequelize.DATE,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

const OrderItem = sequelize.define(
  'orderitem',
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.DECIMAL, allowNull: false },
    qty: { type: Sequelize.INTEGER, allowNull: false },
    image: { type: Sequelize.STRING, allowNull: true },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Order.hasMany(OrderItem, { as: 'orderitem' });
OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
});

export { Order, OrderItem };
