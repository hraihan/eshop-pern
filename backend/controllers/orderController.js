import asyncHandler from 'express-async-handler';
//import createOrder from '../../frontend_org/src/actions/orderActions.js';
import { Order, OrderItem } from '../models/orderModel.js';

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
});

// @desc    Create new order
// @route   POST /api/orders orderItems
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    try {
      const createOrder = await Order.create(
        {
          user_id: req.user.id,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
          orderitem: [
            { name: 'some Name' },
            { qty: 6 },
            { price: 555 },
            { product_id: 2 },
          ],
        },
        {
          include: [OrderItem],
        }
      );
      //await createOrder.createOrderItem({});

      // const createOrderItems = await createOrder.addOrderItem([orderItems]);
      //const createdOrder = await order.save();
    } catch (error) {
      console.log('>> Error while creating order: ', error.message);
    }

    res.status(201).json(createOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: OrderItems,
  });

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findByPk(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findByPk(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    where: {
      user_id: req.user.id,
    },
  });

  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findALL({
    where: {
      user_id: req.user.id,
    },
    attributes: ['id', 'name'],
  });
  //const orders = await Order.findALL({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
