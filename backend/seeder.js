import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
//import Order from './models/orderModel.js'
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await Order.destroy({truncate: true})
    //await Product.destroy();
    //await User.destroy();
    // await User.sync({ force: true });
    // console.log('The table for the User model was just (re)created!');

    // await Product.sync({ force: true });
    // console.log('The table for the User model was just (re)created!');

    //const createdUsers = await User.bulkCreate(users);

    //const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user_id: 7 };
    });

    await Product.bulkCreate(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.destroy({ truncate: true });
    await Product.destroy({ truncate: true });
    await User.destroy({ truncate: true });

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
